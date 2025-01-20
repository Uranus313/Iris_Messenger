import { getDirectConversationsForUser } from "../Infrastructure/direct.js";
import { getAllConversationsForUser } from "../Infrastructure/message.js";
import { getUsersByIds } from "./message_brokers/rabbitmq-sender.js";
import logger from "./utilities/loggers/generalLogger.js";

export const getMyAllConversations = async (req , res) =>{
    try {
        
        let result = await getAllConversationsForUser({groupId : req.params.groupId,limit: req.query.limit,floor:req.query.floor});
        if (result.error){
            res.status(400).send({message : result.error});
            logger.info(result.error);
            return;
        }
        let userIds = result.response.data.map( item => {
            if(item.type == "direct"){
                return item.conversation.otherUser;
            }
        });
        let result2 = await getUsersByIds(userIds,"user");
        if (result2.error){
            res.status(400).send({message : result2.error});
            logger.info(result2.error);
            return;
        }
        let users = result2.data.users;
        for (let index1 = 0; index1 < users.length; index1++) {
            for (let index2 = 0; index2 < result.response.data.length; index2++) {
                if(result.response.data[index2] == "direct"){
                    if(users[index1].id == result.response.data[index2].conversation.otherUser){
                        delete item.otherUser;
                        result.response.data[index2].conversation.user = users[index1];
                        break;
                    }
                }
                
            }
        }    
        res.send(result.response);
    } catch (error) {
        res.status(500).send({message:"internal server error"});

        logger.error("internal server error ",error);
    }
    
}



