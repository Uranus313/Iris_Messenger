
import logger from "../utilities/loggers/generalLogger.js";
import {  sendTokenValidationRequest } from "../message_brokers/rabbitmq-sender.js";
export async function auth(req,res, next, acceptedStatuses){
    
    let token = req.cookies["x-auth-token"];
    
    if(!token){
        res.status(401).send({message: "access denied , no token provided" });
        return;
    }
    try {
        const result = await sendTokenValidationRequest(token);
        if(result.error){
            res.status(401).send({ message: result.error });
            logger.info(result.error);
            return
        }
        
        let checker = false;
        for (let index = 0; index < acceptedStatuses.length; index++) {
        if (result.data.status == acceptedStatuses[index]) {
            checker = true;
            break
        }
        }

        if (!checker) {
        res
            .status(401)
            .send({
            message: "access denied. invalid " + acceptedStatuses.join(", "),
            });
            logger.info({
                message: "access denied. invalid " + acceptedStatuses.join(", "),
                });    
        return;
        }
        req.user = {...result.data.user,status : result.data.status};
        next();
       
    } catch (error) {
    //   console.log(error)
        res.status(400).send({message: "internal server error" });
        logger.error("internal server error ",error);
    }
}