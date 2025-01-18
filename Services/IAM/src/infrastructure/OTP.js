import { OTP } from "../domain/OTP.js";

export let readOTPs = async (id,conditions) =>{
    if(id){
        let otp = await OTP.findOne({where:{id : id}});
        if(otp){
            otp = await otp.toJSON();
                
            }
        delete otp.password;
        return otp;
    }if(conditions){
        let otps = await OTP.findAll({where: conditions});
        for (let index = 0; index < otps.length; index++) {
            let element = otps[index];
            element = await element.toJSON();
            delete element.password;

        }
        return otps;  
    }else{
        let otps = await OTP.findAll();
        for (let index = 0; index < otps.length; index++) {
            let element = otps[index];
            element = await element.toJSON();
        delete element.password;

        }
        return otps;  
    }
    
}
export let createOTP = async (newotp) =>{
    let otp = await OTP.create(newotp);
    otp = await otp.toJSON();
    delete otp.password;

    return otp;
}

export let deleteOTP = async (id) =>{
    let otp = await OTP.findOne({where:{id : id}});
    if(otp){
        await otp.destroy();
        return "deleted";
    }else{
        return null;
    }
}