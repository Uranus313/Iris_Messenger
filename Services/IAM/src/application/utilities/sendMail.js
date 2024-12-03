import nodemailer from 'nodemailer'
const transporter = nodemailer.createTransport(
    {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth:{
            user: process.env.emailName,
            pass: process.env.emailPass
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
        console.log( process.env.emailName, process.env.emailPass)
    const info = await transporter.sendMail(mailOptions );
     return info
        
    } catch (error) {
        return {error :error}
    }
}