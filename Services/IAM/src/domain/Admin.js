import { DataTypes } from "sequelize";
import { sequelize } from "../DB/DbConnection.js";
export const Admin = sequelize.define("Admin",{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    
    firstName:{
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName:{
        type: DataTypes.STRING,
        allowNull: true
    },
    phoneNumber:{
        type: DataTypes.STRING,
        allowNull : true,
        unique : true
    },
    email :{
        type: DataTypes.STRING,
        allowNull : false,
        unique: true

    },
    password : {
        type: DataTypes.STRING
    },
    isOnline:{
        type: DataTypes.BOOLEAN,
        allowNull : false,
        defaultValue : true
    },
    isBanned:{
        type: DataTypes.BOOLEAN,
        allowNull : false,
        defaultValue : false
    },
    isDeleted:{
        type: DataTypes.BOOLEAN,
        allowNull : false,
        defaultValue : false
    },
    lastScene:{
        type: DataTypes.DATE,
        allowNull : false,
        defaultValue: DataTypes.NOW
    }  ,
    createdAt:{
        type: DataTypes.DATE,
        allowNull : false,
        defaultValue: DataTypes.NOW
    }        
});
