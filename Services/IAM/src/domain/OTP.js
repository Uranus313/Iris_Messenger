import { DataTypes } from "sequelize";
import { sequelize } from "../DB/DbConnection.js";
export const OTP = sequelize.define("OTP",{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique : true
    },
    code:{
        type: DataTypes.STRING,
        allowNull: false,
        unique : true
    },
    createdAt:{
        type: DataTypes.DATE,
        allowNull : false,
        defaultValue: DataTypes.NOW
    }        
});
