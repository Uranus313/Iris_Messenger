import { where } from "sequelize";
import { User } from "../domain/User.js"

export const readUsers = async (id,conditions) =>{
    if(id){
        const user = await User.findOne({where:{id : id}});
        user = await user.toJSON();
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
export const createUser = async (user) =>{
    const user = await User.create(user);
    user = await user.toJSON();
    delete user.password;

    return user;
}
export const updateUser = async (id,newUser) =>{
    const user = await User.findOne({where:{id : id}});
    if(user){
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