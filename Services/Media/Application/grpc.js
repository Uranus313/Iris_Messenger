import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import path from 'path';
import crypto from 'crypto';
import { gfs } from '../DB/db.js';
import logger from '../utilities/loggers/generalLogger.js';
import { fileURLToPath } from 'url';

function uploadFile(call, callback) {
    const { file, filename, originalname, uploadedBy } = call.request;

    const randomFilename = crypto.randomBytes(16).toString('hex') + path.extname(originalname);

    const uploadStream = gfs.openUploadStream(randomFilename, {
        metadata: { 
            uploadedBy,
            originalname,
        },
    });

    uploadStream.end(Buffer.from(file));

    uploadStream.on('finish', () => {
        const response = {
            id: uploadStream.id.toString(),
            filename: uploadStream.filename,
            uploadDate: new Date().toISOString(),
        };
        logger.info('File uploaded successfully:', response);
        callback(null, response);
    });

    uploadStream.on('error', (err) => {
        logger.error('File upload failed:', err);
        callback(err);
    });
}


export default function() {

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    
    const PROTO_PATH = path.join(__dirname, '../config/media.proto');
    const packageDefinition = protoLoader.loadSync(PROTO_PATH);
    const mediaProto = grpc.loadPackageDefinition(packageDefinition).media;
    
    const server = new grpc.Server();
    server.addService(mediaProto.MediaService.service, { UploadFile: uploadFile });
    server.bindAsync('0.0.0.0:8087', grpc.ServerCredentials.createInsecure(), (err, port) => {
        if (err) {
            logger.error("Failed to start server", err);
            return
        }
        logger.info(`Media gRPC server running on port ${port}`);
    });
}

