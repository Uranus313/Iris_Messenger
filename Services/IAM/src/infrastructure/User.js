import { where } from "sequelize";
import { User } from "../domain/User.js"

export const readUsers = async (id,conditions) =>{
    if(id){
        const user = await User.findOne({where:{id : id}});
        if(user){
            user = await user.toJSON();
                
        }
        delete user.password;
        return user;
    }if(conditions){
        const users = await User.findAll({where: conditions});
        for (let index = 0; index < users.length; index++) {
            const element = users[index];
            element = await element.toJSON();
            delete element.password;

        }
        return users;  
    }else{
        const users = await User.findAll();
        for (let index = 0; index < users.length; index++) {
            const element = users[index];
            element = await element.toJSON();
        delete element.password;

        }
        return users;  
    }
    
}
export const findUserWithPassword = async (email,password) =>{
    const user = await User.findOne({where:{email : email}});
    if(!user){
        user = await user.toJSON();
    }
    return user;
}
export const createUser = async (newuser) =>{
    const user = await User.create(newuser);
    user = await user.toJSON();
    delete user.password;

    return user;
}
export const updateUser = async (id,newUser) =>{
    
    const user = await User.findOne({where:{id : id}});
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
export const deleteUser = async (id) =>{
    const user = await User.findOne({where:{id : id}});
    if(user){
        user.isDeleted = true;
        await user.save();
        return "deleted";
    }else{
        return null;
    }
}