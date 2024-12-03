import express from 'express';
import cors from 'cors';
import DbConnection from './DB/DbConnection.js';
import userRouter from "./presentation/user.js"
import adminRouter from "./presentation/admin.js"
import generalRouter from "./presentation/general.js"

const app = express();
const port = process.env.PORT || 3000;
DbConnection();
app.use(cors({
    origin: true, // Allow all origins
    credentials: true // Allow credentials
}));
app.use(express.json());
app.get('/', async (req,res,next) =>{
    res.send("hello world!");
});
app.use("/users",userRouter);
app.use("/admins",adminRouter);
app.use("/general",generalRouter);

app.listen(port, async () =>{
    console.log("server listening on port " + port);
})
