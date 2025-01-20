import { validateNumericId, validateObjectId } from "../contracts/general";
import { getChannels } from "../Infrastructure/channel";
import { getDirects } from "../Infrastructure/direct";
import { getGroups } from "../Infrastructure/group";
import { getMessages } from "../Infrastructure/message";






export const getDirectMessages = async (req , res) =>{

    
    try {
        const {error: error1} = validateObjectId(req.params.directId);
    if(error2){
        res.status(400).send({ message: error1.details[0].message });
        return;
    }
    const {error: error2} = validateNumericId(req.user.id);
    if(error2){
        res.status(400).send({ message: error2.details[0].message });
        return;
    }


    const direct = await getDirects({id: req.params.directId});
    if(direct.error){
        res.status(400).send({ message: direct.error  });
        return;
    }
    if(!direct.response){
        res.status(404).send({ error: "direct not found" });
        return;
    }
    if(direct.response.firstUser != req.user.id || direct.response.secondUser != req.user.id){
        res.status(404).send({ error: "you are not in this direct" });
        return;
    }
        
        let result = await getMessages({searchParams:{
            directId : req.params.directId
        },limit: req.query.limit,floor:req.query.floor});
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


export const getGroupMessages = async (req , res) =>{
    
    try {
        const {error: error1} = validateObjectId(req.params.groupId);
    if(error2){
        res.status(400).send({ message: error1.details[0].message });
        return;
    }
    const {error: error2} = validateNumericId(req.user.id);
    if(error2){
        res.status(400).send({ message: error2.details[0].message });
        return;
    }


    const group = await getGroups({id: req.params.groupId});
    if(group.error){
        res.status(400).send({ message: group.error  });
        return;
    }
    if(!group.response){
        res.status(404).send({ error: "group not found" });
        return;
    }
    if(!group.response.members.some(member => member.id == req.user.id) ){
        res.status(404).send({ error: "you are not in this group" });
        return;
    }
        
        let result = await getMessages({searchParams:{
            groupId : req.params.groupId
        },limit: req.query.limit,floor:req.query.floor});

        if (result.error){
            res.status(400).send({message : result.error});
            logger.info(result.error);
            return;
        }
        const uniqueSenderIds = [...new Set( result.response.data.filter(message => message.senderUserId !== req.user.id) .map(message => message.senderUserId) )];
        let result2 = await getUsersByIds(uniqueSenderIds,"user");
        if (result2.error){
            res.status(400).send({message : result2.error});
            logger.info(result2.error);
            return;
        }
        let users = result2.data.users;
        for (let index1 = 0; index1 < users.length; index1++) {
            for (let index2 = 0; index2 < result.response.data.length; index2++) {
                if(users[index1].id == result.response.data[index2].senderUserId){
                    result.response.data[index2].senderUser = users[index1];
                    break;
                }
            }
        }    
        res.send(result.response);
    } catch (error) {
        res.status(500).send({message:"internal server error"});

        logger.error("internal server error ",error);
    }
    
}


export const getChannelMessages = async (req , res) =>{
    
    try {
        const {error: error1} = validateObjectId(req.params.channelId);
    if(error2){
        res.status(400).send({ message: error1.details[0].message });
        return;
    }
    const {error: error2} = validateNumericId(req.user.id);
    if(error2){
        res.status(400).send({ message: error2.details[0].message });
        return;
    }


    const channelMembers = await getChannels({searchParams:{channelId: req.params.channelId}});
    if(channelMembers.error){
        res.status(400).send({ message: channelMembers.error  });
        return;
    }
    if(!channelMembers.response){
        res.status(404).send({ error: "channel not found" });
        return;
    }
    if(!channelMembers.response.data.some(member => member.user.id == req.user.id) ){
        res.status(404).send({ error: "you are not in this channel" });
        return;
    }
        
        let result = await getMessages({searchParams:{
            channelId : req.params.channelId
        },limit: req.query.limit,floor:req.query.floor});

        if (result.error){
            res.status(400).send({message : result.error});
            logger.info(result.error);
            return;
        }
        const uniqueSenderIds = [...new Set( result.response.data.filter(message => message.senderUserId !== req.user.id) .map(message => message.senderUserId) )];
        let result2 = await getUsersByIds(uniqueSenderIds,"user");
        if (result2.error){
            res.status(400).send({message : result2.error});
            logger.info(result2.error);
            return;
        }
        let users = result2.data.users;
        for (let index1 = 0; index1 < users.length; index1++) {
            for (let index2 = 0; index2 < result.response.data.length; index2++) {
                if(users[index1].id == result.response.data[index2].senderUserId){
                    result.response.data[index2].senderUser = users[index1];
                    break;
                }
            }
        }    
        res.send(result.response);
    } catch (error) {
        res.status(500).send({message:"internal server error"});

        logger.error("internal server error ",error);
    }
    
}

