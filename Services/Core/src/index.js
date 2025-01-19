
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import DbConnection from './DB/DbConnection.js';
// import adminRouter from "./src/presentation/admin.js";
// import generalRouter from "./src/presentation/general.js";
// import superAdminRouter from "./src/presentation/superAdmin.js";
import userRouter from "./Presentation/user.js";
import groupRouter from "./Presentation/group.js";
import channelRouter from "./Presentation/channel.js";


import fs from "fs";
import https from 'https';
import cookieParser from "cookie-parser";
import error from './Application/middlewares/error.js';
import morgan from 'morgan';
dotenv.config({path: './src/config/secret/.env'});

const app = express();
const port = process.env.PORT || 3003;
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
app.use("/users",(req,res,next) => auth(req,res,next,["user"]),userRouter);
app.use("/groups",(req,res,next) => auth(req,res,next,["user"]),groupRouter);

// app.use("/admins",adminRouter);
// app.use("/general",generalRouter);
// app.use("/superAdmin",superAdminRouter);
app.use(error);

const httpsServer = https.createServer(options, app);

httpsServer.listen(port, async () =>{
    console.log("server listening on port " + port);
})


