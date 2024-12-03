import { DataTypes } from "sequelize";
import { sequelize } from "../DB/DbConnection.js";
export const SuperAdmin = sequelize.define("SuperAdmin",{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    
    email :{
        type: DataTypes.STRING,
        allowNull : false,
        unique: true

    },
    password : {
        type: DataTypes.STRING
    },
    createdAt:{
        type: DataTypes.DATE,
        allowNull : false,
        defaultValue: DataTypes.NOW
    }        
});
