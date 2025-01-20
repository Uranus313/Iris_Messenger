import server from '../index.js';
import cookieParser from 'cookie-parser'; // You can use this package to parse cookies

console.log("testws");
const io = new SocketIO(server, {
    path: '/ws',
  });
// Middleware to parse cookies
io.use((socket, next) => {
  // You can access cookies from the socket request
  const token = socket.request.cookies['x-auth-token']; // Extract the token

  if (!token) {
    return next(new Error('Authentication error: Token missing'));
  }


  // Validate the JWT token
 
    // Store the decoded user info in the socket for later use
// Store user data from the token (e.g., userId)
    next(); // Proceed with the connection
});

// When the socket is connected
io.on('connection', (socket) => {
  console.log(`User authenticated: ${socket.token}`); // You can access the user's info

  // Handle further socket events...
});