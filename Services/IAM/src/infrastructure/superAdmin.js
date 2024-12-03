
import { SuperAdmin } from "../domain/SuperAdmin.js";

export const readSuperAdmin = async () =>{

        const superAdmin = await SuperAdmin.findOne();
        superAdmin = await superAdmin.toJSON();
        delete superAdmin.password;
        return superAdmin;
}
export const findSuperAdminWithPassword = async (email) =>{
    const admin = await SuperAdmin.findOne({where:{email : email}});
    if(!admin){
        admin = await admin.toJSON();
    }
    return admin;
}
