import { validateBlockedPost } from "../contracts/blocked.js";
import { validateNumericId } from "../contracts/general.js";
import { deleteBlocked, getBlockeds, saveBlocked } from "../Infrastructure/blocked.js";
import { getUsersByIds } from "./message_brokers/rabbitmq-sender.js";
import logger from "./utilities/loggers/generalLogger.js";



export const blockUser = async (req , res) => {
    const {error: validationError} = validateBlockedPost(req.body); 
    if (validationError) {
            res.status(400).send({message : error.details[0].message});
            logger.info( error.details[0].message);
        return;
    }
    try {
        const previousBlock = await getBlockeds({searchParams:{firstUserId : req.user.id , targetUserId : req.body.targetUserId}});
        if (previousBlock.error){
            res.status(400).send({message : result.error});
            logger.info(result.error);
            return;
        }
        if(previousBlock.response.length > 0){
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
    } catch (error) {

        res.status(500).send({message:"internal server error"});

        logger.error("internal server error ",error);

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
        const previousBlock = await getBlockeds({searchParams:{firstUserId : req.user.id , targetUserId : req.body.targetUserId}});
        if (previousBlock.error){
            res.status(400).send({message : result.error});
            logger.info(result.error);
            return;
        }
        if(previousBlock.response.length == 0){
            res.status(400).send({message : "you already didn't block this user"});
            logger.info( "you already didn't block this user");
            return;
        }
        const result = await deleteBlocked(previousBlock.response[0]._id);
        if (result.error){
            res.status(400).send({message : result.error});
            logger.info(result.error);
            return;
        }
        res.send(result.response);
        res.body = result.response;
    } catch (error) {
        res.status(500).send({message:"internal server error"});
        logger.error("internal server error ",error);

    }
}

export const getBlockedUsers = async (req,res) =>{
    try {
        const blocks = await getBlockeds({searchParams:{firstUserId : req.user.id }});
        
        if (blocks.error){
            res.status(400).send({message : result.error});
            logger.info(result.error);
            return;
        }
        if(previousBlock.response.length == 0){
            res.send([]);
            return;
        }
        const result = await getUsersByIds(previousBlock.response,"user");
        if (result.error){
            res.status(400).send({message : result.error});
            logger.info(result.error);
            return;
        }
        res.send(result.data.users);
    } catch (error) {
        res.status(500).send({message:"internal server error"});
        logger.error("internal server error ",error);

    }
}

