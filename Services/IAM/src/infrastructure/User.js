import { where } from "sequelize";
import { User } from "../domain/User.js"

export let readUsers = async (id,conditions) =>{
    if(id){
        let user = await User.findOne({where:{id : id}});
        if(user){
            user = await user.toJSON();
                
        }
        delete user.password;
        return user;
    }if(conditions){
        let users = await User.findAll({where: conditions});
        for (let index = 0; index < users.length; index++) {
            let element = users[index];
            element = await element.toJSON();
            delete element.password;
            users[index] = element;

        }
        return users;  
    }else{
        let users = await User.findAll();
        for (let index = 0; index < users.length; index++) {
            let element = users[index];
            element = await element.toJSON();
        delete element.password;
        users[index] = element;

        }
        return users;  
    }
    
}
export let findUserWithPassword = async (email,password) =>{
    let user = await User.findOne({where:{email : email}});
    if(user){
        user = await user.toJSON();
    }
    return user;
}
export let createUser = async (newuser) =>{
    let user = await User.create(newuser);
    user = await user.toJSON();
    delete user.password;

    return user;
}
export let updateUser = async (id,newUser) =>{
    
    let user = await User.findOne({where:{id : id}});
    if(user){
        if(newUser.password){
    newUser.password = await hashPassword(newUser.password);      
        }
        Object.keys(user).forEach(key => {
            user[key] = newUser[key];
        });
        await user.save();
        user = await user.toJSON();
        delete user.password;

        return user ;
    }
    else{
        return null;
    }
}
export let deleteUser = async (id) =>{
    let user = await User.findOne({where:{id : id}});
    if(user){
        user.isDeleted = true;
        await user.save();
        return "deleted";
    }else{
        return null;
    }
}