import { readUsers } from "../../infrastructure/user.js";
import jwt from "jsonwebtoken";
export async function auth(req,res, next, acceptedStatuses){
    let token = req.cookies["x-auth-token"];
    if(!token){
        res.status(401).send({message: "access denied , no token provided" });
        return;
    }
    try {
        const decoded = jwt.verify(token, process.env.JWTSecret);
        let checker = false;
        for (let index = 0; index < acceptedStatuses.length; index++) {
        if (decoded.status == acceptedStatuses[index]) {
            checker = true;
        }
        }
        if (!checker) {
        res
            .status(401)
            .send({
            error: "access denied. invalid " + acceptedStatuses.join(", "),
            });
        res.body = {
            error: "access denied. invalid " + acceptedStatuses.join(", "),
        };
        return;
        }
        switch (decoded.status) {
            case "user":
              let user = await readUsers(decoded.id);
              // console.log(user.addresses)
              if (!user.id) {
                res.status(401).send({ error: "access denied. invalid user." });
                res.body = { error: "access denied. invalid user." };
      
                return;
              }
              if (user.isBanned || user.isDeleted) {
                res.status(403).send({ error: "access denied. you are banned/deleted." });
                res.body = { error: "access denied. you are banned/deleted." };
      
                return;
              }
              req.user = user;
              if(next){
              next();
              }
              break;
      
              case "admin":
                let admin = await readUsers(decoded.id);
                // console.log(user.addresses)
                if (!admin.id) {
                  res.status(401).send({ error: "access denied. invalid admin." });
                  res.body = { error: "access denied. invalid admin." };
        
                  return;
                }
                if (admin.isBanned || admin.isDeleted) {
                  res.status(403).send({ error: "access denied. you are banned/deleted." });
                  res.body = { error: "access denied. you are banned/deleted." };
        
                  return;
                }
                req.user = admin;
                if(next){
                next();
                }
                break;
                case "superAdmin":
                    const superAdmin = await readUsers(decoded.id);
                    // console.log(superAdmin.addresses)
                    if (!superAdmin.id) {
                      res.status(401).send({ error: "access denied. invalid superAdmin." });
                      res.body = { error: "access denied. invalid superAdmin." };
            
                      return;
                    }
                    req.user = superAdmin;
                    if(next){
                    next();
                    }
                    break;
            default:
              break;
          }
       
        next();
    } catch (error) {
        res.status(400).send({message: "invalid token" });
    }
}