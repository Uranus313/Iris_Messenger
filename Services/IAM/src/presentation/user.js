import express from 'express';
import { auth } from '../application/authorization/auth.js';
import { acceptOTP, getAllUsers, getUserByID, searchUserByEmail, sendOTP, userDelete, userDeleteProfilePicture, userEdit, userSignUp, userUpdateProfilePicture } from '../application/user.js';
import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage });
const router = express.Router();
router.get("/getAllUsers",(req,res,next) => auth(req,res,next,["admin","superAdmin"]),getAllUsers);
router.get("/getAllUsers/:id",(req,res,next) => auth(req,res,next,["admin","superAdmin"]), getUserByID);
router.post("/signUp",upload.single("file"), userSignUp);
router.put("/updateProfilePicture",(req,res,next) => auth(req,res,next,["user"]),upload.single("file"), userUpdateProfilePicture);
router.delete("/deleteProfilePicture",(req,res,next) => auth(req,res,next,["user"]), userDeleteProfilePicture);
router.patch("/editUser",(req,res,next) => auth(req,res,next,["user"]), userEdit);
router.delete("/delete",(req,res,next) => auth(req,res,next,["user"]), userDelete);
router.post("/createOTP", sendOTP);
router.post("/checkOTP", acceptOTP);
router.get("/searchUserByEmail/:email",(req,res,next) => auth(req,res,next,["user"]), searchUserByEmail);

export default router;