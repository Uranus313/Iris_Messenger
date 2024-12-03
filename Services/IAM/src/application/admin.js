import { findAdminWithPassword, readAdmins } from "../infrastructure/admin.js";

import jwt from "jsonwebtoken";


export const getAllAdmins = async (req,res) => {
    try {
        const admins = await readAdmins();
        res.send(admins);
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"internal server error"});
    }
}
export const getAdminByID = async (req,res) => {
    try {
        const admin = await readAdmins(req.params.id);
        res.send(admin)
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"internal server error"});
    }
}
export const adminEdit = async (req,res) => {
    try {
        const admin = await createAdmin(req.body.id,req.body);
        res.send(admin)
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"internal server error"});
    }
}
export const adminSignUp = async (req,res) => {
    try {
        
        const admin = await createAdmin(req.body);
        const token = jwt.sign({ id: admin.id, status: "admin" }, process.env.JWTSecret, { expiresIn: '30d' });
        // res.cookie('x-auth-token', token, {
        //     httpOnly: true,
        //     // secure: process.env.NODE_ENV == "development"?null : true,
        //     secure: false,

        //     sameSite: 'none',
        //     maxAge: 24 * 60 * 60 * 1000 *30
        // });
        
        res.send(admin)
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"internal server error"});
    }
}
export const adminDelete = async (req,res) => {
    try {
        const admin = await deleteAdmin(req.params.id);
        res.send(admin)
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"internal server error"});
    }
}
export const adminLogIn = async(req,res)=>{
    try {
        const admin = await findAdminWithPassword(undefined,{email: req.body.email});
        if(admin){
        res.status(404).send({message:"admin not found"});
        return;
        }
        const passwordCheck = await comparePassword(req.body.password , admin.password);
        if(!passwordCheck){
            res.status(401).send({message:"wrong password"});
            return result;
        }
        delete admin.password;
        const token = jwt.sign({ id: admin.id, status: "admin" }, process.env.JWTSecret, { expiresIn: '30d' });
        // res.cookie('x-auth-token', token, {
        //     httpOnly: true,
        //     // secure: process.env.NODE_ENV == "development"?null : true,
        //     secure: false,

        //     sameSite: 'none',
        //     maxAge: 24 * 60 * 60 * 1000 *30
        // });
        res.setHeader("auth-token",token);
        
        res.send(admin);
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"internal server error"});
    }
}
