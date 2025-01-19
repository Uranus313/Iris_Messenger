import "express-async-errors";
import express from "express";
import { db } from "./DB/db.js";
import { port } from "./utilities/configs/config.js";
import logger from "./utilities/loggers/generalLogger.js";
import cors from 'cors';
import mediaRouter from './Presentation/routes.js';
import error from "./Middlewares/error.js";
import grpcStart from "./Application/grpc.js";
import fs from "fs";
import https from 'https';
db();
grpcStart();
const app = express();
app.use(cors());
app.use(mediaRouter);
app.use(error);
// routes(app);
const options = {
    key: fs.readFileSync("../key.pem"), // Replace with your private key path
    cert: fs.readFileSync("../cert.pem"), // Replace with your certificate path
  };

  const httpsServer = https.createServer(options, app);

httpsServer.listen(port, async () =>{
    console.log("server listening on port " + port);
})
