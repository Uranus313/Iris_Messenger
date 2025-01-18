import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
dotenv.config({path: './config/secret/.env'});

const transporter = nodemailer.createTransport(
    {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth:{
            user: process.env.EMAIL_NAME,
            pass: process.env.EMAIL_PASS
        }
    }
);
export async function sendMail({title,text,targetEmail}){
    const mailOptions = {
        from: "Iris",
        to: targetEmail,
        subject:title,
        text:text
    }
    try {
        console.log( process.env.EMAIL_NAME, process.env.EMAIL_PASS)
    const info = await transporter.sendMail(mailOptions );
     return info
        
    } catch (error) {
        return {error :error}
    }
}