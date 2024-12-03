import express from 'express';
import cors from 'cors';
import DbConnection from './DB/DbConnection.js';
import { readUsers } from './infrastructure/User.js';
import userRouter from "./presentation/user.js"
const app = express();
const port = process.env.PORT || 3000;
DbConnection();
app.use(cors());
app.use(express.json());
// app.get('/', async (req,res,next) =>{
//     res.send("hello world!");
//     console.log(await readUsers())
// });
app.use("/users",userRouter);
app.listen(port, async() =>{
    console.log("server listening on port " + port);
})
