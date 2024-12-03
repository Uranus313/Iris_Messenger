import { findSuperAdminWithPassword } from "../infrastructure/superAdmin.js";
import jwt from "jsonwebtoken";
import { comparePassword } from "./utilities/hashing.js";

export const superAdminLogIn = async(req,res)=>{
    try {
        console.log(req.body)
        const superAdmin = await findSuperAdminWithPassword( req.body.email);
        if(!superAdmin){
        res.status(404).send({message:"superAdmin not found"});
        return;
        }
        // const passwordCheck = await comparePassword(req.body.password , superAdmin.password);

        if(req.body.password != superAdmin.password){
            res.status(401).send({message:"wrong password"});
            return result;
        }
        delete superAdmin.password;
        const token = jwt.sign({ id: superAdmin.id, status: "superAdmin" }, process.env.JWTSecret, { expiresIn: '30d' });
        // res.cookie('x-auth-token', token, {
        //     httpOnly: true,
        //     // secure: process.env.NODE_ENV == "development"?null : true,
        //     secure: false,

        //     sameSite: 'none',
        //     maxAge: 24 * 60 * 60 * 1000 *30
        // });
        res.setHeader("auth-token",token);

        res.send({...superAdmin,status: "superAdmin"});
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"internal server error"});
    }
}