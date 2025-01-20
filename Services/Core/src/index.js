
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import DbConnection from './DB/DbConnection.js';
// import adminRouter from "./src/presentation/admin.js";
// import generalRouter from "./src/presentation/general.js";
// import superAdminRouter from "./src/presentation/superAdmin.js";
import routes from "./Presentation/routes.js";
import { Server as SocketIO } from 'socket.io';



import fs from "fs";
import https from 'https';
import cookieParser from "cookie-parser";
import error from './Application/middlewares/error.js';
import morgan from 'morgan';
console.log("arsam1");

dotenv.config({path: './src/config/secret/.env'});

const app = express();
const port = process.env.PORT || 3003;
console.log("arsam1");
DbConnection();
console.log("arsam");
app.use(cors({
    origin: true,// Allow all origins
    credentials: true // Allow credentials
    // allowedHeaders: true,
    // exposedHeaders: ["auth-token"]
}));
const options = {
    key: fs.readFileSync("../../key.pem"), // Replace with your private key path
    cert: fs.readFileSync("../../cert.pem"), // Replace with your certificate path
  };
console.log("key333")

console.log("key",options)
app.use(morgan('dev'));

app.use(express.json());
app.use(cookieParser());
// app.use(express.urlencoded({ extended: true }));
app.get('/', async (req,res,next) =>{
    res.send("hello world!");
});




app.use("",routes);

app.use(error);

export const httpsServer = https.createServer(options, app);

httpsServer.listen(port, async () =>{
    console.log("server listening on port " + port);
})

const io = new SocketIO(httpsServer, {
    path: '/ws',
  });
  // Middleware to parse cookies
//   io.use((socket, next) => {
//     // You can access cookies from the socket request
//     const token = socket.request.cookies['x-auth-token']; // Extract the token
//     console.log(token);
//     if (!token) {
//       return next(new Error('Authentication error: Token missing'));
//     }
  
  
//     // Validate the JWT token
   
//       // Store the decoded user info in the socket for later use
//   // Store user data from the token (e.g., userId)
//       next(); // Proceed with the connection
//   });
  
  // When the socket is connected
  io.on('connection', (socket) => {
    console.log(`User authenticated: ${socket.token}`); // You can access the user's info
  
    // Handle further socket events...
  });