import { findSuperAdminWithPassword } from "../infrastructure/superAdmin.js";

export const superAdminLogIn = async(req,res)=>{
    try {
        const superAdmin = await findSuperAdminWithPassword(undefined,{email: req.body.email});
        if(superAdmin){
        res.status(404).send({message:"superAdmin not found"});
        return;
        }
        const passwordCheck = await comparePassword(req.body.password , superAdmin.password);
        if(!passwordCheck){
            res.status(401).send({message:"wrong password"});
            return result;
        }
        delete superAdmin.password;
        const token = jwt.sign({ id: superAdmin.id, status: "superAdmin" }, process.env.JWTSECRET, { expiresIn: '30d' });
        res.cookie('x-auth-token', token, {
            httpOnly: true,
            // secure: process.env.NODE_ENV == "development"?null : true,
            secure: false,

            sameSite: 'none',
            maxAge: 24 * 60 * 60 * 1000 *30
        });
        res.send(superAdmin);
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"internal server error"});
    }
}