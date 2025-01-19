import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import DbConnection from './src/DB/DbConnection.js';
import adminRouter from "./src/presentation/admin.js";
import generalRouter from "./src/presentation/general.js";
import superAdminRouter from "./src/presentation/superAdmin.js";
import userRouter from "./src/presentation/user.js";
import fs from "fs";
import https from 'https';
import cookieParser from "cookie-parser";
import morgan from 'morgan';
import {setupRabbitMQUserSender , setupRabbitMQTokenValidation} from './src/application/message_brokers/rabbitmq.js';
dotenv.config({path: './src/config/secret/.env'});

const app = express();
const port = process.env.PORT || 3001;
DbConnection();
setupRabbitMQTokenValidation();
setupRabbitMQUserSender();

app.use(cors({
    origin: true,// Allow all origins
    credentials: true // Allow credentials
    // allowedHeaders: true,
    // exposedHeaders: ["auth-token"]
}));
const options = {
    key: fs.readFileSync("../key.pem"), // Replace with your private key path
    cert: fs.readFileSync("../cert.pem"), // Replace with your certificate path
  };

app.use(morgan('dev'));

app.use(express.json());
app.use(cookieParser());
// app.use(express.urlencoded({ extended: true }));
app.get('/', async (req,res,next) =>{
    res.send("hello world!");
});
app.use("/users",userRouter);
app.use("/admins",adminRouter);
app.use("/general",generalRouter);
app.use("/superAdmin",superAdminRouter);
const httpsServer = https.createServer(options, app);

httpsServer.listen(port, async () =>{
    console.log("server listening on port " + port);
})
