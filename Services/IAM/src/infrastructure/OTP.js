import { where } from "sequelize";
import { OTP } from "../domain/OTP.js"

export const readOTPs = async (id,conditions) =>{
    if(id){
        const otp = await OTP.findOne({where:{id : id}});
        otp = await otp.toJSON();
        delete otp.password;
        return otp;
    }if(conditions){
        const otps = await OTP.findAll({where: conditions});
        for (let index = 0; index < otps.length; index++) {
            const element = otps[index];
            element = await element.toJSON();
            delete element.password;

        }
        return otps;  
    }else{
        const otps = await OTP.findAll();
        for (let index = 0; index < otps.length; index++) {
            const element = otps[index];
            element = await element.toJSON();
        delete element.password;

        }
        return otps;  
    }
    
}
export const createOTP = async (otp) =>{
    const otp = await OTP.create(otp);
    otp = await otp.toJSON();
    delete otp.password;

    return otp;
}

export const deleteOTP = async (id) =>{
    const otp = await OTP.findOne({where:{id : id}});
    if(otp){
        await otp.destroy();
        return "deleted";
    }else{
        return null;
    }
}