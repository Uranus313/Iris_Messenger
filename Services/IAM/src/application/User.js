import { createOTP, deleteOTP, readOTPs } from "../infrastructure/OTP.js";
import { readUsers } from "../infrastructure/user.js";
import { generateRandomString } from "./utilities/randomString.js";
import { sendMail } from "./utilities/sendMail.js";

export const getAllUsers = async (req,res) => {
    try {
        const users = await readUsers();
        res.send(users);
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"internal server error"});
    }
}
export const getUserByID = async (req,res) => {
    try {
        const user = await readUsers(req.params.id);
        res.send(user)
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"internal server error"});
    }
}
export const userEdit = async (req,res) => {
    try {
        const user = await createUser(req.user.id,req.body);
        res.send(user)
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"internal server error"});
    }
}
export const userSignUp = async (req,res) => {
    try {
        let receivedtoken = req.cookies["x-auth-token"];
    if(!token){
        res.status(401).send({message: "access denied , no token provided" });
        return;
    }
        const decoded = jwt.verify(receivedtoken, process.env.JWTSecret);
        if(decoded.email != req.body.email){
            res.status(401).send({message: "access denied , this email is not verified" });
            return;
        }
        const user = await createUser(req.body);
        const token = jwt.sign({ id: user.id, status: "user" }, process.env.JWTSECRET, { expiresIn: '30d' });
        res.cookie('x-auth-token', token, {
            httpOnly: true,
            // secure: process.env.NODE_ENV == "development"?null : true,
            secure: false,

            sameSite: 'none',
            maxAge: 24 * 60 * 60 * 1000 *30
        });
        res.send(user)
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"internal server error"});
    }
}
export const userDelete = async (req,res) => {
    try {
        const user = await deleteUser(req.user.id);
        res.send(user)
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"internal server error"});
    }
}
// export const userLogIn = async(req,res)=>{
//     try {
//         const users = await readUsers(undefined,{email: req.body.email});
//         if(users.length ==0){
//         res.status(404).send({message:"user not found"});
//         return;
//         }
//         const token = jwt.sign({ id: users[0].id, status: "user" }, process.env.JWTSECRET, { expiresIn: '30d' });
//         res.cookie('x-auth-token', token, {
//             httpOnly: true,
//             // secure: process.env.NODE_ENV == "development"?null : true,
//             secure: true,

//             sameSite: 'none',
//             maxAge: 24 * 60 * 60 * 1000 *30
//         });
//         res.send(users[0]);
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({message:"internal server error"});
//     }
// }
export const sendOTP= async(req , res)=>{
    try {
        const oldOTP = await readOTPs(undefined,{email: req.body.email});
        
        if(oldOTP[0] && (Date.now - oldOTP.creationDate.getTime() ) < (120 * 1000) ){
            res.status(400).send({message:"the old otp is still valid"});
            return;
        }
        if(oldOTP[0]){
            await deleteOTP(oldOTP[0].id)
        }
        const randomCode = generateRandomString(6);
        const newOTP = await createOTP({email : req.body.email, code : randomCode});
        if( !newOTP){
            throw new Error("something went wrong with otp");
        }
        const info = await sendMail({title: "your Iris Verification code",text: randomCode, targetEmail:req.body.email});
        if(info.error){
            res.status(500).send({message:"couldnt send email"});
            return;
        }
        req.send({message : "Email sent"});
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"internal server error"});
    }
}
export const acceptOTP= async(req , res)=>{
    try {
        const oldOTP = await readOTPs(undefined,{email: req.body.email});
        
        if(!oldOTP[0]  ){
            res.status(401).send({message:"theres no otp for this email"});
            return;
        }
        if(oldOTP[0] && oldOTP[0].code != req.body.verificationCode){
            res.status(401).send({message:"wrong code"});
            return;
        }
        await deleteOTP(oldOTP[0].id);
        const oldUser = await readUsers(undefined,{email: req.body.email});
        if(oldUser[0]){
            const token = jwt.sign({ id: oldUser[0].id, status: "user" }, process.env.JWTSECRET, { expiresIn: '30d' });
        res.cookie('x-auth-token', token, {
            httpOnly: true,
            // secure: process.env.NODE_ENV == "development"?null : true,
            secure: false,

            sameSite: 'none',
            maxAge: 24 * 60 * 60 * 1000 *30
        });
        res.send(oldUser[0]);
        return;
        }
        const token = jwt.sign({ email:req.body.email, status: "incompeleteUser" }, process.env.JWTSECRET, { expiresIn: '1h' });
        res.cookie('x-auth-token', token, {
            httpOnly: true,
            // secure: process.env.NODE_ENV == "development"?null : true,
            secure: false,

            sameSite: 'none',
            maxAge: 1 * 60 * 60 * 1000 
        });
        req.send({message : "new user"});
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"internal server error"});
    }
}
