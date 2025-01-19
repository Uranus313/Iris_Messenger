import jwt from "jsonwebtoken";
import { validateGetOTP, validateSendOTP, validateUserChangeinfo, validateUserPost } from "../contracts/user.js";
import { createOTP, deleteOTP, readOTPs } from "../infrastructure/OTP.js";
import { createUser, readUsers, updateUser } from "../infrastructure/user.js";
import { mediaGRPC } from "./utilities/grpc-sender.js";
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
    // console.log(req.body);
    console.log(req.body)

    const {error: error2} = validateUserChangeinfo(req.body);
    if(error2){
        res.status(400).send({ message: error2.details[0].message });
        return
    }
    try {
        const user = await updateUser(req.user.id,req.body);
        res.send(user)
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"internal server error"});
    }
}
export const userSignUp = async (req,res) => {

    
    try {
        console.log(req.body)
    console.log("test")
    const sentBody = JSON.parse(req.body.data);
    const {error: error2} = validateUserPost(sentBody);
    if(error2){
        res.status(400).send({ message: error2.details[0].message });
        return
    }
        console.log(1);
        console.log(req.cookies["x-auth-token"]);
        console.log(2);

        let receivedtoken =req.cookies["x-auth-token"];
        console.log(receivedtoken);
    if(!receivedtoken){
        res.status(401).send({message: "access denied , no token provided" });
        return;
    }
        console.log(process.env.JWTSecret)
        const decoded = jwt.verify(receivedtoken, process.env.JWTSecret);
        console.log(decoded)
        // console.log(req)
        if(decoded.status != "incompeleteUser"){
            res.status(401).send({message: "access denied , invalid token" });
            return;
        }
        if(decoded.email != sentBody.email){
            res.status(401).send({message: "access denied , this email is not verified" });
            return;
        }
        if(req.file){
            const request = {
                // file: fileBuffer,
                file: req.file.buffer,
                filename: req.file.filename,
                originalname: req.file.originalname,
                uploadedBy: req.user?.id || 'anonymous',
                // uploadedBy: 'anonymous',
            };

            mediaGRPC.UploadFile(request, async (err, response) => {
                if (err) {
                    console.error('gRPC upload failed:', err);
                    return res.status(500).send('Failed to upload file.');
                }
        
                console.log('File uploaded via gRPC:', response);
                const user = await createUser({...sentBody  ,profilePicture: response.filename})
                const token = jwt.sign({ id: user.id, status: "user" }, process.env.JWTSecret, { expiresIn: '30d' });
            res.cookie('x-auth-token', token, {
                httpOnly: true,
                // secure: process.env.NODE_ENV == "development"?null : true,
                secure: true,
    
                sameSite: 'none',
                maxAge: 24 * 60 * 60 * 1000 *30
            });
            // res.setHeader("auth-token",token);
            res.send({...user,status: "user"});
            });
        }else{
            const user = await createUser(sentBody);
            const token = jwt.sign({ id: user.id, status: "user" }, process.env.JWTSecret, { expiresIn: '30d' });
            res.cookie('x-auth-token', token, {
                httpOnly: true,
                // secure: process.env.NODE_ENV == "development"?null : true,
                secure: true,
    
                sameSite: 'none',
                maxAge: 24 * 60 * 60 * 1000 *30
            });
            // res.setHeader("auth-token",token);
            res.send({...user,status: "user"});
        }
        
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
export const userDeleteProfilePicture = async (req,res) =>{
    try{
        const user = updateUser(user.id,{profilePicture : null});
        res.send({...user,status: "user"});
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"internal server error"});
    }
}
export const userUpdateProfilePicture = async (req,res) =>{
    try{
        if(req.file){
            const request = {
                // file: fileBuffer,
                file: req.file.buffer,
                filename: req.file.filename,
                originalname: req.file.originalname,
                uploadedBy: req.user.id || 'anonymous',
                // uploadedBy: 'anonymous',
            };
        
            mediaGRPC.UploadFile(request, async (err, response) => {
                if (err) {
                    console.error('gRPC upload failed:', err);
                    return res.status(500).send('Failed to upload file.');
                }
        
                console.log('File uploaded via gRPC:', response);
               
            const user = updateUser(user.id,{profilePicture : response.filename});
            res.send({...user,status: "user"});
            });
        }else{
            res.status(400).send({message:"no file received"});
        }
        
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
//         const token = jwt.sign({ id: users[0].id, status: "user" }, process.env.JWTSecret, { expiresIn: '30d' });
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
    const {error: error2} = validateGetOTP(req.body);
    console.log(req.body);
    if(error2){
        res.status(400).send({ message: error2.details[0].message });
        return
    }
    try {
        console.log("ofeopirgeweqwokqllpgejgfekolpdlkgnj")

        const oldOTP = await readOTPs(undefined,{email: req.body.email});
        console.log(oldOTP)
        if(oldOTP[0] && (Date.now - oldOTP[0].createdAt.getTime() ) < (120 * 1000) ){
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
        console.log("ofeopirgeweqwokqllpgejgfekolpdlkgnj")
        const info = await sendMail({title: "your Iris Verification code",text: randomCode, targetEmail:req.body.email});
        if(info.error){
            console.log(info.error)
            res.status(500).send({message:"couldnt send email"});
            return;
        }
        res.send({message : "Email sent"});
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"internal server error", error: error});
    }
}
export const acceptOTP= async(req , res)=>{
    const {error: error2} = validateSendOTP(req.body);
    if(error2){
        res.status(400).send({ message: error2.details[0].message });
        return
    }
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
        console.log(process.env.JWTSecret);
        if(oldUser[0]){
            console.log(oldUser[0]);
            const token = jwt.sign({ id: oldUser[0].id, status: "user" }, process.env.JWTSecret, { expiresIn: '30d' });
        res.cookie('x-auth-token', token, {
            httpOnly: true,
            // secure: process.env.NODE_ENV == "development"?null : true,
            secure: true,

            sameSite: 'none',
            maxAge: 24 * 60 * 60 * 1000 *30
        });
        // res.setHeader("auth-token",token);
        res.send({...oldUser[0],status: "user"});
        return;
        }
        const token = jwt.sign({ email:req.body.email, status: "incompeleteUser" }, process.env.JWTSecret, { expiresIn: '1h' });
        res.cookie('x-auth-token', token, {
            httpOnly: true,
            // secure: process.env.NODE_ENV == "development"?null : true,
            secure: true,

            sameSite: 'none',
            maxAge: 1 * 60 * 60 * 1000 
        });
        console.log(token);
        // res.setHeader("auth-token",token);

        res.send({message : "new user"});
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"internal server error"});
    }
}
