
import { SuperAdmin } from "../domain/SuperAdmin.js";

export const readSuperAdmin = async () =>{

        const superAdmin = await SuperAdmin.findOne();
        superAdmin = await superAdmin.toJSON();
        delete superAdmin.password;
        return superAdmin;
}
