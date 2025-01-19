import { validateBlockedPost } from "../contracts/blocked";
import { validateNumericId } from "../contracts/general";
import { getBlockeds, saveBlocked } from "../Infrastructure/blocked";
import logger from "./utilities/loggers/generalLogger";



export const blockUser = async (req , res) => {
    const {error: validationError} = validateBlockedPost(req.body); 
    if (validationError) {
            res.status(400).send({message : error.details[0].message});
            logger.info( error.details[0].message);
        return;
    }
    try {
        const previousBlock = await getBlockeds(undefined,{firstUserId : req.user.id , targetUserId : req.body.targetUserId});
        if(previousBlock.length > 0){
            res.status(400).send({message : "you already blocked this user"});
            logger.info( "you already blocked this user");
            return;
        }
        const result = await saveBlocked({firstUserId : req.user.id , targetUserId : req.body.targetUserId});
        if (result.error){
            res.status(400).send({message : result.error});
            logger.info(result.error);
            return;
        }
        res.send(result.response);
        res.body = result.response;
    } catch (err) {
        logger.info("internal server error");
        res.status(500).send({message:"internal server error"});
    }
}


export const unblockUser = async (req , res) => {
    const {error: validationError} = validateNumericId(req.params.userId); 
    if (validationError) {
            res.status(400).send({message : error.details[0].message});
            logger.info( error.details[0].message);
        return;
    }
    try {
        const previousBlock = await getBlockeds(undefined,{firstUserId : req.user.id , targetUserId : req.body.targetUserId});
        if(previousBlock.length == 0){
            res.status(400).send({message : "you already blocked this user"});
            logger.info( "you already blocked this user");
            return;
        }
        const result = await saveBlocked({firstUserId : req.user.id , targetUserId : req.body.targetUserId});
        if (result.error){
            res.status(400).send({message : result.error});
            logger.info(result.error);
            return;
        }
        res.send(result.response);
        res.body = result.response;
    } catch (err) {
        logger.info("internal server error");
        res.status(500).send({message:"internal server error"});
    }
}
