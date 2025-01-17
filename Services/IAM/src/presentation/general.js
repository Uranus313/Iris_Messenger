import express from 'express';
import { checkToken } from '../application/General.js';
import { auth } from '../application/authorization/auth.js';

const router = express.Router();


router.get("/checkToken",(req,res,next) => auth(req,res,next,["user","admin","superAdmin"]), checkToken);
export default router;