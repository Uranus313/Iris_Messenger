import { Server as SocketIO } from 'socket.io';
import cookie from 'cookie';
import { sendTokenValidationRequest } from '../Application/message_brokers/rabbitmq-sender.js';
import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage });


const processFileUpload = (socket, next) => {
    const multerMiddleware = upload.single('file'); // 'file' should be the key of the file input in FormData

    multerMiddleware(socket.request, {}, (err) => {
        if (err) {
            return next(new Error(`File upload error: ${err.message}`));
        }
        // File is available in socket.request.file
        socket.file = socket.request.file;
        next();
    });
};


export const initializeSocket = async (httpsServer) => {
    const io = new SocketIO(httpsServer, {
        path: '/ws',
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"],
            credentials: true
        }
    });

    // A mapping of user IDs to their corresponding socket connections
    const userConnections = new Map();

    // Middleware to parse cookies and authenticate users
    io.use(async (socket, next) => {
        const cookies = cookie.parse(socket.request.headers.cookie || ''); 
        const token = cookies['x-auth-token']; // Extract the token

        if (!token) {
            return next(new Error('Authentication error: Token missing'));
        }

        try {
            const result = await sendTokenValidationRequest(token);
            if (result.error) {
                return next(new Error(`Authentication error: ${result.error}`));
            }

            const user = result.data.user;
            if (!user) {
                return next(new Error('Authentication error: User missing'));
            }

            // Attach the authenticated user to the socket object
            socket.user = user;

            // Store the user's connection
            if (!userConnections.has(user.id)) {
                userConnections.set(user.id, []);
            }
            userConnections.get(user.id).push(socket);

            // Proceed with the connection
            next();
        } catch (err) {
            return next(new Error(`Authentication error: ${err.message}`));
        }
    });

    // When the socket is connected
    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.user.id}`);

        // Handle disconnection
        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.user.id}`);

            // Remove the socket from the user's connection list
            const connections = userConnections.get(socket.user.id) || [];
            const updatedConnections = connections.filter((conn) => conn !== socket);
            if (updatedConnections.length > 0) {
                userConnections.set(socket.user.id, updatedConnections);
            } else {
                userConnections.delete(socket.user.id);
            }
        });

        // Handle messages or other events here...
        socket.on('sendMessage', (formDataBuffer) => {
            const formData = new FormData(formDataBuffer);
        
            const parsedData = {};
            formData.forEach((value, key) => {
                parsedData[key] = value;
            });
        
            const targetUserId = parsedData.targetUserId;
            const message = parsedData.message;
        
            // Process the file upload
            processFileUpload(socket, (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
        
                const fileBuffer = socket.file.buffer;
                const fileName = socket.file.originalname;
                const mimeType = socket.file.mimetype;
        
                // Retrieve the target user's connections
                const targetConnections = userConnections.get(targetUserId);
        
                if (targetConnections && targetConnections.length > 0) {
                    targetConnections.forEach((targetSocket) => {
                        targetSocket.emit('receiveMessage', {
                            from: socket.user.id,
                            message,
                            file: {
                                buffer: fileBuffer,
                                fileName,
                                mimeType
                            }
                        });
                    });
                } else {
                    console.log(`User ${targetUserId} is not connected`);
                }
            });
        });
        
        
    });
};
