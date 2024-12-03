import express from 'express';
import { checkToken } from '../application/General.js';
import { auth } from '../application/authorization/auth.js';
import { superAdminLogIn } from '../application/superAdmin.js';

const router = express.Router();


router.get("/logIn",superAdminLogIn);
export default router;