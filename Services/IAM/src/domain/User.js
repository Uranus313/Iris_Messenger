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
    phoneNumber:{
        type: DataTypes.STRING,
        allowNull : false
    },
    email :{
        type: DataTypes.STRING,
        allowNull : false,
        unique: true

    },
    password : {
        type: DataTypes.STRING,
        allowNull : false
    },
    createdAt:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }        
});
