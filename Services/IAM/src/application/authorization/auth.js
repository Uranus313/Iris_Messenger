import { readUsers } from "../../infrastructure/user";
import jwt from "jsonwebtoken";
export async function auth(req,res, next){
    let token = req.header("auth-token");
    if(!token){
        res.status(401).send({message: "access denied , no token provided" });
        return;
    }
    try {
        const decoded = jwt.verify(token, process.env.JWTSecret);
        const user = await readUsers(decoded.id);
        if(!user){
        res.status(400).send({message: "invalid token" });
            return;
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(400).send({message: "invalid token" });
    }
}