
import { SuperAdmin } from "../domain/SuperAdmin.js";

export let readSuperAdmin = async (id) =>{

        let superAdmin = await SuperAdmin.findOne({where:{id : id}});
        if(superAdmin){
            superAdmin = await superAdmin.toJSON();
        delete superAdmin.password;
    }
        return superAdmin;
}
export let findSuperAdminWithPassword = async (email) =>{
    let admin = await SuperAdmin.findOne({where:{email : email}});
    if(admin){
        admin = await admin.toJSON();
    }
    return admin;
}
