
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import DbConnection from './DB/DbConnection.js';
import routes from "./Presentation/routes.js";
import { Server as SocketIO } from 'socket.io';
import cookie from 'cookie';


import fs from "fs";
import https from 'https';
import cookieParser from "cookie-parser";
import error from './Application/middlewares/error.js';
import morgan from 'morgan';
import { initializeSocket } from './Presentation/socket.js';
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

initializeSocket(httpsServer);