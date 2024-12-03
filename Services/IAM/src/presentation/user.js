import express from 'express';
import { createUser, deleteUser, readUsers } from '../infrastructure/User';
import { auth } from '../application/authorization/auth';
import jwt from "jsonwebtoken";
import { getAllUsers, userEdit, userSignUp } from '../application/User';

const router = express.Router();
router.get("/getAllUsers",getAllUsers);
router.post("/logIn", userLogIn)
router.get("/getAllUsers/:id", getUserByID);
router.post("/signUp", userSignUp);
router.patch("/editUser",auth, userEdit);
router.delete("/delete",auth, userDelete);
router.get("/checkToken",auth, checkToken)