import express from "express";
import morgan from "morgan";
import uploader from "../Middlewares/uploader.js";

import logger from "../utilities/loggers/generalLogger.js";
import { upload, allFiles, getFile, deleteFile } from "../Application/media.js";

const router = express.Router();



    if (router.get('env') === 'development') {
        router.use(morgan('dev'));
        logger.info("morgan enabled...");
    }

    router.use(express.json());
    router.use(express.urlencoded({ extended: true })); 

    router.post("/upload", uploader.single("file"), upload);

    router.get("/", allFiles);

    router.get("/file/:filename", getFile);

    router.delete("/file/:id", deleteFile);

    // router.use(error);
export default router;
