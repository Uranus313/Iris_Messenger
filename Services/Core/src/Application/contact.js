import { validateContactPost } from "../contracts/contact.js";
import { validateNumericId } from "../contracts/general.js";
import { deleteContact, getContacts, saveContact } from "../Infrastructure/contact.js";
import { getUsersByIds } from "./message_brokers/rabbitmq-sender.js";
import logger from "./utilities/loggers/generalLogger.js";



export const addContact = async (req , res) => {
    const {error: error} = validateContactPost(req.body); 
    if (error) {
            res.status(400).send({message : error.details[0].message});
            logger.info( error.details[0].message);
        return;
    }
    try {
        const previousContact = await getContacts({searchParams:{firstUserId : req.user.id , targetUserId : req.body.targetUserId}});
        if (previousContact.error){
            res.status(400).send({message : previousContact.error});
            logger.info(previousContact.error);
            return;
        }
        if(previousContact.response.length > 0){
            res.status(400).send({message : "you already contact this user"});
            logger.info( "you already contact this user");
            return;
        }
        const result = await saveContact({firstUserId : req.user.id , targetUserId : req.body.targetUserId});
        if (result.error){
            res.status(400).send({message : result.error});
            logger.info(result.error);
            return;
        }
        res.send(result.response);
        
    } catch (error) {

        res.status(500).send({message:"internal server error"});

        logger.error("internal server error ",error);

    }
}


export const removeContact = async (req , res) => {
    const {error: error} = validateNumericId(req.params.userId); 
    if (error) {
            res.status(400).send({message : error.details[0].message});
            logger.info( error.details[0].message);
        return;
    }
    try {
        const previousContact = await getContacts({searchParams:{firstUserId : req.user.id , targetUserId : req.params.userId}});
        if (previousContact.error){
            res.status(400).send({message : previousContact.error});
            logger.info(previousContact.error);
            return;
        }
        if(previousContact.response.data){
            previousContact.response = previousContact.response.data;
        }
        if(previousContact.response.length == 0){
            res.status(400).send({message : "you already didn't contact this user"});
            logger.info( "you already didn't contact this user");
            return;
        }
        const result = await deleteContact(previousContact.response[0]._id);
        if (result.error){
            res.status(400).send({message : result.error});
            logger.info(result.error);
            return;
        }
        res.send(result.response);
        
    } catch (error) {
        res.status(500).send({message:"internal server error"});
        logger.error("internal server error ",error);

    }
}

export const getMyContacts = async (req,res) =>{
    try {
        const contacts = await getContacts({searchParams:{firstUserId : req.user.id }});
        
        if (contacts.error){
            res.status(400).send({message : contacts.error});
            logger.info(contacts.error);
            return;
        }
        if(contacts.response.data){
            contacts.response = contacts.response.data;
        }
        if(contacts.response.length == 0){
            res.send([]);
            return;
        }
        const users = contacts.response.map( item => item.targetUserId);
        const result = await getUsersByIds(users,"user");
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

