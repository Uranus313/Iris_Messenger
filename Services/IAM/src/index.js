import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import DbConnection from './DB/DbConnection.js';
import adminRouter from "./presentation/admin.js";
import generalRouter from "./presentation/general.js";
import superAdminRouter from "./presentation/superAdmin.js";
import userRouter from "./presentation/user.js";

import cookieParser from "cookie-parser";
dotenv.config({path: './config/.env'});
const app = express();
const port = process.env.PORT || 3001;
DbConnection();
app.use(cors({
    origin: "http://localhost:5173",// Allow all origins
    credentials: true // Allow credentials
    // allowedHeaders: true,
    // exposedHeaders: ["auth-token"]
}));
process.env.JWTSecret = "mysecret";



app.use(express.json());
app.use(cookieParser());

app.get('/', async (req,res,next) =>{
    res.send("hello world!");
});
app.use("/users",userRouter);
app.use("/admins",adminRouter);
app.use("/general",generalRouter);
app.use("/superAdmin",superAdminRouter);


app.listen(port, async () =>{
    console.log("server listening on port " + port);
})
