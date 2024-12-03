import { Sequelize } from "sequelize";
// import { readUsers } from "../infrastructure/User.js";
export const sequelize = new Sequelize("Iris","postgres","admin",{
    host: "localhost",
    dialect: "postgres"
});
export default async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({force: true});
        // console.log(await readUsers());
        console.log("Authenticated");
    } catch (error) {
        console.error("db connection error",error);
    }
}