import "express-async-errors";
import express from "express";
import { db } from "./DB/db.js";
import { port } from "./utilities/configs/config.js";
import logger from "./utilities/loggers/generalLogger.js";
import cors from 'cors';
import mediaRouter from './Presentation/routes.js';
import error from "./Middlewares/error.js";
db();

const app = express();
app.use(cors());
app.use(mediaRouter);
app.use(error);
// routes(app);

app.listen(port, () => logger.info(`listening on port ${port}...`));