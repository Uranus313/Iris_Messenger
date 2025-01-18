import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

 const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROTO_PATH = path.join(__dirname, '../../../media.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const mediaProto = grpc.loadPackageDefinition(packageDefinition).media;

export const mediaGRPC = new mediaProto.MediaService('localhost:8087', grpc.credentials.createInsecure()); // export grpc client

// function registerUser(req, res) {
//     if (!req.file) {
//         return res.status(400).send('Profile photo is required.');
//     }

//     const fileBuffer = fs.readFileSync(req.file.path); // Use multer or similar to parse the file

//     const request = {
//         file: fileBuffer,
//         filename: req.file.filename,
//         originalname: req.file.originalname,
//         uploadedBy: req.user._id || 'anonymous',
//     };

//     client.UploadFile(request, (err, response) => {
//         if (err) {
//             console.error('gRPC upload failed:', err);
//             return res.status(500).send('Failed to upload file.');
//         }

//         console.log('File uploaded via gRPC:', response);

//         // Continue with user registration logic
//         res.status(201).send({
//             message: 'User registered successfully',
//             fileId: response.id,
//         });
//     });
// }
