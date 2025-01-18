import crypto from "crypto";
import path from "path";
import { gfs } from "../DB/db.js";
import mongoose from "mongoose";
import logger from "../utilities/loggers/generalLogger.js";


export function upload(req, res) {

    if (!req.file) {
        return res.status(400).send("No file uploaded.");
    }

    const filename = crypto.randomBytes(16).toString("hex") + path.extname(req.file.originalname);

    const uploadStream = gfs.openUploadStream(filename, {
        metadata: { 
            uploadedBy: req.user ? req.user._id : "anonymous",
            originalname: req.file.originalname
        },
    });

    uploadStream.end(req.file.buffer);

    uploadStream.on("finish", () => {
        const file = {
            filename: uploadStream.filename,
            id: uploadStream.id,
            // bucketName: uploadStream.s.options.bucketName,
            uploadDate: new Date(),
        };

        logger.info("File uploaded successfully:", file);
        res.status(201).json({ file });
    });

    uploadStream.on("error", (err) => {
        throw new Error(err);
    });
}

export async function allFiles(req, res) {
    const files = await gfs.find({}).toArray();
    if (!files || files.length === 0) return res.status(404).json({ message: "No files found" });
    res.status(200).json(files);
}

export function getFile(req, res) {

    const filename = req.params.filename;

    const downloadStream = gfs.openDownloadStreamByName(filename);

    downloadStream.on("data", (chunk) => {
        res.write(chunk);
    });

    downloadStream.on("end", () => {
        res.end();
    });

    downloadStream.on("error", (err) => {
        if (/FileNotFound/.test(err.message)) {
            // console.error(err.message);
            return res.status(404).json({
                message: "File not found.",
                err: err
            });
        }
        throw new Error(err);
    });
}

export async function deleteFile(req, res) {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send("Invalid file ID.");
    }

    const fileId = mongoose.Types.ObjectId.createFromHexString(req.params.id);
   
    await gfs.delete(fileId);

    res.status(200).json({message: "File deleted successfully."});
}