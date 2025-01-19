
import { validateGroupPost } from "../contracts/group.js";
import { validateGroupMemberRemove } from "../contracts/groupMember.js";
import { validateNumericId, validateObjectId } from "../contracts/general.js";
import { addMemberToGroup, addMemberToGroup, deleteGroup, getGroups, getGroupsForUser, getUsersInGroup, removeMemberFromGroup, saveGroup } from "../Infrastructure/group.js";
import { getUsersByIds } from "./message_brokers/rabbitmq-sender.js";
import logger from "./utilities/loggers/generalLogger.js";



export const getGroups = async (req , res) =>{
    try {
        let searchParams = {...req.query};
        delete searchParams.floor;
        delete searchParams.limit;
        delete searchParams.nameSearch;
        delete searchParams.sort;
        delete searchParams.desc;
        // console.log(req.query.limit)
        const result = await getGroups({id: req.params.groupId,searchParams: searchParams,limit: req.query.limit,floor:req.query.floor,textSearch: req.query.textSearch,sort:req.query.sort,desc:req.query.desc});
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


export const addGroup = async (req , res) => {
    const {error: validationError} = validateGroupPost(req.body); 
    if (validationError) {
            res.status(400).send({message : error.details[0].message});
            logger.info( error.details[0].message);
        return;
    }
    try {
        const previousGroup = await getGroups({searchParams:{link : req.body.link} , seeDeleted: true});
        if (previousGroup.error){
            res.status(400).send({message : previousGroup.error});
            logger.info(previousGroup.error);
            return;
        }
        if(previousGroup.response.length > 0){
            res.status(400).send({message : "a group with this link already exists"});
            logger.info( "a group with this link already exists");
            return;
        }
        const result = await saveGroup({ ...req.body , ownerId : req.user.id});
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


export const removeGroup = async (req , res) => {
    const {error: validationError} = validateNumericId(req.params.groupId); 
    if (validationError) {
            res.status(400).send({message : error.details[0].message});
            logger.info( error.details[0].message);
        return;
    }
    try {
        const previousGroup = await getGroups({id:req.params.groupId});
        if (previousGroup.error){
            res.status(400).send({message : previousGroup.error});
            logger.info(previousGroup.error);
            return;
        }
        if(!previousGroup.response){
            res.status(404).send({message : "this group doesnt exist"});
            logger.info( "this group doesnt exist");
            return;
        }
        if(previousGroup.response.ownerId != req.user.id){
            res.status(403).send({message : "you dont own this group"});
            logger.info( "you dont own this group");
            return;
        }
        const result = await deleteGroup(req.params.groupId);
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

export const getMyGroups = async (req,res) =>{
    try {
        const groups = await getGroupsForUser({id: req.user.id });
        
        if (groups.error){
            res.status(400).send({message : groups.error});
            logger.info(groups.error);
            return;
        }
        
        res.send(groups.response);
    } catch (error) {
        res.status(500).send({message:"internal server error"});
        logger.error("internal server error ",error);

    }
}


export const joinGroup = async (req , res) => {
    const {error: validationError} = validateObjectId(req.params.groupId); 
    if (validationError) {
            res.status(400).send({message : error.details[0].message});
            logger.info( error.details[0].message);
        return;
    }
    try {
        const result = await addMemberToGroup({userId: req.user.id , groupId : req.params.groupId});
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

export const leaveGroup = async (req , res) => {
    const {error: validationError} = validateObjectId(req.params.groupId); 
    if (validationError) {
            res.status(400).send({message : error.details[0].message});
            logger.info( error.details[0].message);
        return;
    }
    try {
        const result = await removeMemberFromGroup({userId: req.user.id , groupId : req.params.groupId});
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
export const removeUserFromGroup = async (req , res) =>{
    const {error: validationError} = validateGroupMemberRemove(req.body); 
    if (validationError) {
            res.status(400).send({message : error.details[0].message});
            logger.info( error.details[0].message);
        return;
    }
    try {
        const previousGroup = await getGroups({id:req.body.groupId});
        if (previousGroup.error){
            res.status(400).send({message : previousGroup.error});
            logger.info(previousGroup.error);
            return;
        }
        if(!previousGroup.response){
            res.status(404).send({message : "this group doesnt exist"});
            logger.info( "this group doesnt exist");
            return;
        }
        if(previousGroup.response.ownerId != req.user.id){
            res.status(403).send({message : "you dont own this group"});
            logger.info( "you dont own this group");
            return;
        }
        const result = await removeMemberFromGroup({userId: req.user.id , groupId : req.params.groupId});
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



export const getGroupUsers = async (req , res) =>{
    const {error: validationError} = validateObjectId(req.params.groupId); 
    if (validationError) {
            res.status(400).send({message : error.details[0].message});
            logger.info( error.details[0].message);
        return;
    }
    try {
        
        let result = await getUsersInGroup({groupId : req.params.groupId});
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



