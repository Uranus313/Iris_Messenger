import express from 'express';
import { auth } from '../application/authorization/auth.js';
import { acceptOTP, getAllUsers, getUserByID, sendOTP, userDelete, userEdit, userSignUp } from '../application/user.js';

const router = express.Router();
router.get("/getAllUsers",(req,res,next) => auth(req,res,next,["admin","superAdmin"]),getAllUsers);
router.get("/getAllUsers/:id",(req,res,next) => auth(req,res,next,["admin","superAdmin"]), getUserByID);
router.post("/signUp", userSignUp);
router.patch("/editUser",(req,res,next) => auth(req,res,next,["user"]), userEdit);
router.delete("/delete",(req,res,next) => auth(req,res,next,["user"]), userDelete);
router.post("/createOTP", sendOTP);
router.post("/checkOTP", acceptOTP);
export default router;