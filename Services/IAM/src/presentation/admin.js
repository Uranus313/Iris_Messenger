import express from 'express';
import { auth } from '../application/authorization/auth.js';
import {  getAllAdmins, getAdminByID,adminDelete,adminEdit,adminSignUp, adminLogIn } from '../application/admin.js';

const router = express.Router();
router.get("/getAllAdmins",(req,res,next) => auth(req,res,next,["superAdmin"]),getAllAdmins);
router.get("/getAllAdmins/:id",(req,res,next) => auth(req,res,next,["superAdmin"]), getAdminByID);
router.post("/signUp",(req,res,next) => auth(req,res,next,["superAdmin"]),adminSignUp);
router.patch("/editAdmin",(req,res,next) => auth(req,res,next,["superAdmin"]),adminEdit);
router.delete("/delete",(req,res,next) => auth(req,res,next,["superAdmin"]),adminDelete);
router.post("/logIn",adminLogIn);
export default router;
