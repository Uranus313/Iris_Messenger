import { DataTypes } from "sequelize";
import { sequelize } from "../DB/DbConnection.js";
export const User = sequelize.define("User",{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username:{
        type: DataTypes.STRING,
        allowNull: false,
        unique : true
    },
    bio:{
        type: DataTypes.STRING,
        allowNull: true,
        unique : true
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
    twoStepPassword : {
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
