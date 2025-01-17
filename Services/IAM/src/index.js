import express from 'express';
import cors from 'cors';
import DbConnection from './DB/DbConnection.js';
import userRouter from "./presentation/user.js"
import adminRouter from "./presentation/admin.js"
import generalRouter from "./presentation/general.js"
import superAdminRouter from "./presentation/superAdmin.js"


import cookieParser from "cookie-parser";
const app = express();
const port = process.env.PORT || 3001;
DbConnection();
app.use(cors({
    origin: true, // Allow all origins
    credentials: true, // Allow credentials
    // allowedHeaders: true,
    exposedHeaders: ["auth-token"]
}));
process.env.JWTSecret = "mysecret";

process.env.emailName= "mehrbodmh82@gmail.com";
process.env.emailPass= "humhylbgqsvdlxxx";

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
