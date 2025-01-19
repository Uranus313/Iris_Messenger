import { where, Op } from "sequelize";
import { Admin } from "../domain/Admin.js"
import { hashPassword } from "../application/utilities/hashing.js";
export let readAdmins = async (id,conditions , idArray) =>{
    if(id){
        let admin = await Admin.findOne({where:{id : id}});
        if(admin){
        admin = await admin.toJSON();
        delete admin.password;
            
        }
        return admin;
    }else if(idArray){
        let admins = await Admin.findAll({ 
            where: { id: { [Op.in]: idArray } } 
        });
        admins = admins.map((admin) => {
            admin = admin.toJSON();
            delete admin.password;
            return admin;
        });
        return admins;
    }
    else if(conditions){
        let admins = await Admin.findAll({where: conditions});
        for (let index = 0; index < admins.length; index++) {
            let element = admins[index];
            element = await element.toJSON();
            delete element.password;
            admins[index] = element;
        }
        return admins;  
    }else{
        let admins = await Admin.findAll();
        for (let index = 0; index < admins.length; index++) {
            let element = admins[index];
            element = await element.toJSON();
        delete element.password;
        admins[index] = element;

        }
        return admins;  
    }
    
}

export let findAdminWithPassword = async (email) =>{
        let admin = await Admin.findOne({where:{email : email}});
        if(admin){
            admin = await admin.toJSON();
        }
        return admin;
}
export let createAdmin = async (newadmin) =>{
    if(newadmin.password){
        newadmin.password = await hashPassword(newadmin.password);

    }
    let admin = await Admin.create(newadmin);
    admin = await admin.toJSON();
    delete admin.password;

    return admin;
}
export let updateAdmin = async (id,newAdmin) =>{
    let admin = await Admin.findOne({where:{id : id}});
    if(admin){
        Object.keys(newAdmin).forEach(key => {
            admin  [key] = newAdmin[key];
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
export let deleteAdmin = async (id) =>{
    let admin = await Admin.findOne({where:{id : id}});
    if(admin){
        admin.isDeleted = true;
        await admin.save();
        return "deleted";
    }else{
        return null;
    }
}