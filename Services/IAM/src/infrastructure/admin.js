import { where } from "sequelize";
import { Admin } from "../domain/Admin.js"
import { hashPassword } from "../application/utilities/hashing.js";

export const readAdmins = async (id,conditions) =>{
    if(id){
        const admin = await Admin.findOne({where:{id : id}});
        if(admin){
        admin = await admin.toJSON();
            
        }
        delete admin.password;
        return admin;
    }if(conditions){
        const admins = await Admin.findAll({where: conditions});
        for (let index = 0; index < admins.length; index++) {
            const element = admins[index];
            element = await element.toJSON();
            delete element.password;

        }
        return admins;  
    }else{
        const admins = await Admin.findAll();
        for (let index = 0; index < admins.length; index++) {
            const element = admins[index];
            element = await element.toJSON();
        delete element.password;

        }
        return admins;  
    }
    
}

export const findAdminWithPassword = async (email) =>{
        const admin = await Admin.findOne({where:{email : email}});
        if(!admin){
            admin = await admin.toJSON();
        }
        return admin;
}
export const createAdmin = async (newadmin) =>{
    admin.password = await hashPassword(newadmin.password);
    const admin = await Admin.create(admin);
    admin = await admin.toJSON();
    delete admin.password;

    return admin;
}
export const updateAdmin = async (id,newAdmin) =>{
    const admin = await Admin.findOne({where:{id : id}});
    if(admin){
        Object.keys(admin).forEach(key => {
            admin[key] = newAdmin[key];
        });
        await admin.save();
        admin = await admin.toJSON();
        delete admin.password;

        return admin ;
    }
    else{
        return null;
    }
}
export const deleteAdmin = async (id) =>{
    const admin = await Admin.findOne({where:{id : id}});
    if(admin){
        admin.isDeleted = true;
        await admin.save();
        return "deleted";
    }else{
        return null;
    }
}