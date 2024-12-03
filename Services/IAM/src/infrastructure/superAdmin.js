
import { SuperAdmin } from "../domain/SuperAdmin.js";

export let readSuperAdmin = async () =>{

        let superAdmin = await SuperAdmin.findOne();
        superAdmin = await superAdmin.toJSON();
        delete superAdmin.password;
        return superAdmin;
}
export let findSuperAdminWithPassword = async (email) =>{
    let admin = await SuperAdmin.findOne({where:{email : email}});
    if(!admin){
        admin = await admin.toJSON();
    }
    return admin;
}
