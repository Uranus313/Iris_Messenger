import { validateChannelPost } from "../contracts/channel.js";
import { validateChannelMemberRemove } from "../contracts/channelMember.js";
import { validateNumericId, validateObjectId } from "../contracts/general.js";
import { deleteChannel, getChannels, saveChannel } from "../Infrastructure/channel.js";
import { addUserToChannel, getChannelsForUser, getUsersInChannel, removeUserFromChannel } from "../Infrastructure/channelMember.js";
import { getUsersByIds } from "./message_brokers/rabbitmq-sender.js";
import { mediaGRPC } from "./utilities/grpc_sender.js";
import logger from "./utilities/loggers/generalLogger.js";



export const getAllChannels = async (req , res) =>{
    try {
        let searchParams = {...req.query};
        delete searchParams.floor;
        delete searchParams.limit;
        delete searchParams.textSearch;
        delete searchParams.sort;
        delete searchParams.desc;
        // console.log(req.query.limit)
        const result = await getChannels({id: req.params.channelId,searchParams: searchParams,limit: req.query.limit,floor:req.query.floor,textSearch: req.query.textSearch,sort:req.query.sort,desc:req.query.desc});
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


export const addChannel = async (req , res) => {
    
    try {
        const sentBody = JSON.parse(req.body.data);
    const {error: error2} = validateChannelPost(sentBody);
    if(error2){
        res.status(400).send({ message: error2.details[0].message });
        return
    }


    const previousChannel = await getChannels({searchParams:{link : sentBody.link} , seeDeleted: true});
    console.log(previousChannel);
    if (previousChannel.error){
        res.status(400).send({message : previousChannel.error});
        logger.info(previousChannel.error);
        return;
    }
    if(previousChannel.response.data.length > 0){
        res.status(400).send({message : "a group with this link already exists"});
        logger.info( "a group with this link already exists");
        return;
    }
        if(req.file){
            const request = {
                // file: fileBuffer,
                file: req.file.buffer,
                filename: req.file.filename,
                originalname: req.file.originalname,
                uploadedBy: req.user?.id || 'anonymous',
                // uploadedBy: 'anonymous',
            };

            mediaGRPC.UploadFile(request, async (err, response) => {
                if (err) {
                    console.error('gRPC upload failed:', err);
                    return res.status(500).send('Failed to upload file.');
                }
        
                console.log('File uploaded via gRPC:', response);
                const result = await saveChannel({ ...sentBody , ownerId : req.user.id, profilePicture: response.filename});
            if (result.error){
            res.status(400).send({message : result.error});
            logger.info(result.error);
            return;
         }
        res.send(result.response);
                
            });
        }else{
            const result = await saveChannel({ ...sentBody , ownerId : req.user.id});
            if (result.error){
                res.status(400).send({message : result.error});
                logger.info(result.error);
                return;
            }
            res.send(result.response);
        }
        
        
    } catch (error) {

        res.status(500).send({message:"internal server error"});

        logger.error("internal server error ",error);

    }
}



export const removeChannel = async (req , res) => {
    const {error: error} = validateObjectId(req.params.channelId); 
    if (error) {
            res.status(400).send({message : error.details[0].message});
            logger.info( error.details[0].message);
        return;
    }
    try {
        const previousChannel = await getChannels({id:req.params.channelId});
        if (previousChannel.error){
            res.status(400).send({message : previousChannel.error});
            logger.info(previousChannel.error);
            return;
        }
        if(!previousChannel.response){
            res.status(404).send({message : "this channel doesnt exist"});
            logger.info( "this channel doesnt exist");
            return;
        }
        if(previousChannel.response.ownerId != req.user.id){
            res.status(403).send({message : "you dont own this channel"});
            logger.info( "you dont own this channel");
            return;
        }
        const result = await deleteChannel(req.params.channelId);
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

export const getMyChannels = async (req,res) =>{
    try {
        const channels = await getChannelsForUser({userId: req.user.id ,limit: req.query.limit,floor:req.query.floor});
        
        if (channels.error){
            res.status(400).send({message : channels.error});
            logger.info(channels.error);
            return;
        }
        
        res.send(channels.response);
    } catch (error) {
        res.status(500).send({message:"internal server error"});
        logger.error("internal server error ",error);

    }
}


export const joinChannel = async (req , res) => {
    const {error: error} = validateObjectId(req.params.channelId); 
    if (error) {
            res.status(400).send({message : error.details[0].message});
            logger.info( error.details[0].message);
        return;
    }
    try {
        const result = await addUserToChannel({userId: req.user.id , channelId : req.params.channelId});
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

export const leaveChannel = async (req , res) => {
    const {error: error} = validateObjectId(req.params.channelId); 
    if (error) {
            res.status(400).send({message : error.details[0].message});
            logger.info( error.details[0].message);
        return;
    }
    try {
        const result = await removeUserFromChannel({userId: req.user.id , channelId : req.params.channelId});
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
export const removeUserFromMyChannel = async (req , res) =>{
    const {error: error} = validateChannelMemberRemove(req.body); 
    if (error) {
            res.status(400).send({message : error.details[0].message});
            logger.info( error.details[0].message);
        return;
    }
    try {
        const previousChannel = await getChannels({id:req.body.channelId});
        if (previousChannel.error){
            res.status(400).send({message : previousChannel.error});
            logger.info(previousChannel.error);
            return;
        }
        if(!previousChannel.response){
            res.status(404).send({message : "this channel doesnt exist"});
            logger.info( "this channel doesnt exist");
            return;
        }
        if(previousChannel.response.ownerId != req.user.id){
            res.status(403).send({message : "you dont own this channel"});
            logger.info( "you dont own this channel");
            return;
        }
        const result = await removeUserFromChannel({userId: req.user.id , channelId : req.params.channelId});
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



export const getChannelUsers = async (req , res) =>{
    const {error: error} = validateObjectId(req.params.channelId); 
    if (error) {
            res.status(400).send({message : error.details[0].message});
            logger.info( error.details[0].message);
        return;
    }
    try {
        const previousChannel = await getChannels({id:req.params.channelId});
        if (previousChannel.error){
            res.status(400).send({message : previousChannel.error});
            logger.info(previousChannel.error);
            return;
        }
        if(!previousChannel.response){
            res.status(404).send({message : "this channel doesnt exist"});
            logger.info( "this channel doesnt exist");
            return;
        }
        console.log(previousChannel.response);
        console.log(req.user.id);
        if(previousChannel.response.ownerId != req.user.id){
            res.status(403).send({message : "you dont own this channel"});
            logger.info( "you dont own this channel");
            return;
        }
        let result = await getUsersInChannel({channelId : req.params.channelId});
        if (result.error){
            res.status(400).send({message : result.error});
            logger.info(result.error);
            return;
        }
        let userIds = result.response.data.map( item => item.userId);
        let result2 = await getUsersByIds(userIds,"user");
        if (result2.error){
            res.status(400).send({message : result2.error});
            logger.info(result2.error);
            return;
        }
        let users = result2.data.users;
        for (let index1 = 0; index1 < users.length; index1++) {
            for (let index2 = 0; index2 < result.response.data.length; index2++) {
                if(users[index1].id == result.response.data[index2].userId){
                    users.role = result.response.data[index2].role;
                    break;
                }
            }
        }    
        res.send(users);
        res.body = users;
    } catch (error) {
        res.status(500).send({message:"internal server error"});

        logger.error("internal server error ",error);
    }
    
}



