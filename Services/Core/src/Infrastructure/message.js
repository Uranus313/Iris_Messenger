import { MessageModel } from "../Domain/Message.js";

export async function saveMessage(messageCreate){
    const result = {};
    const message = new MessageModel(messageCreate);
    const response = await message.save();
    result.response = response.toJSON();
    return result;
}

export async function getMessages({id , searchParams ,limit , floor ,textSearch,sort , desc , seeDeleted }){
    const result = {};
    let sortOrder = (desc == true || desc == "true")? -1 : 1;
    if(id){
        result.response = await MessageModel.find({_id : id}).findOne();
        if(result.response){
            result.response = result.response.toJSON();
        }
        return result;
    }else{
      if (!seeDeleted) {
        searchParams = {
            ...searchParams,
            $or: [
                { deleted: { $exists: false } }, // Field does not exist
                { deleted: null },              // Field is null
                { deleted: false }              // Field is explicitly false
            ]
        };
    }
        let data = null;
        let hasMore = false;
        if(!limit){
            limit = 20;
        }
        if(textSearch && textSearch != ''){
            data = await MessageModel.find({...searchParams,text:{
                $regex: textSearch,
                $options: 'i'
            } }).skip(floor).limit(limit).sort({[sort] : sortOrder} );
            let count = await MessageModel.countDocuments({...searchParams,lastName:{
                $regex: textSearch,
                $options: 'i'
            } });
            hasMore = count > (Number(limit) + Number(floor));
            // console.log(hasMore)
        }else{
            data = await MessageModel.find(searchParams).skip(floor).limit(limit).sort({[sort] : sortOrder} );
            let count = await MessageModel.countDocuments(searchParams);
            // console.log(count);
            // console.log(limit+floor);
            
            hasMore = count > (Number(limit) + Number(floor));
            console.log(hasMore)
        }
        for (let index = 0; index < data.length; index++) {
            data[index] = data[index].toJSON();
            delete data[index].password;
        }
        result.response = {
            data: data,
            hasMore: hasMore
        }
        return result;
    }
}


export async function deleteMessage(id){
    const result = {};
    result.response = await MessageModel.deleteOne({_id : id});
    return result;
}


export async function softDeleteMessage(id){
  const result = {};
  const response = await MessageModel.findByIdAndUpdate(id,{$set :{
    isDeleted: true,
    deletedAt: Date.now()
  }},{new : true});
    result.response = response.toJSON();
  return result;
}


export async function updateMessage(id,messageUpdate ){
    const result = {};
    
    const response = await MessageModel.findByIdAndUpdate(id,{$set :messageUpdate},{new : true});
    result.response = response.toJSON();
    return(result);
}

export async function getAllConversationsForUser({
    userId,
    floor = 0,
    limit = 20,
    seeDeleted = false,
  }) {
    try {
      const queryDeleted = seeDeleted ? {} : { isDeleted: { $ne: true } };
  
      // Aggregation for directs
      const directsPipeline = [
        {
          $match: {
            ...(queryDeleted),
            $or: [{ senderId: userId }, { recipientId: userId }],
            directId: { $exists: true },
          },
        },
        { $sort: { createdAt: -1 } }, // Sort messages by creation date
        {
          $group: {
            _id: "$directId",
            mostRecentMessage: { $first: "$$ROOT" },
          },
        },
        {
          $lookup: {
            from: "directs", // Join with the directs collection
            localField: "_id",
            foreignField: "_id",
            as: "direct",
          },
        },
        { $unwind: "$direct" },
        {
          $addFields: {
            type: "direct",
            conversation: {
              id: "$direct._id",
              otherUser: {
                $cond: [
                  { $eq: ["$direct.firstUserId", userId] },
                  "$direct.secondUserId",
                  "$direct.firstUserId",
                ],
              },
            },
            lastMessage: "$mostRecentMessage",
          },
        },
        { $project: { direct: 0 } }, // Exclude the joined `direct` field
      ];
  
      // Aggregation for groups
      const groupsPipeline = [
        {
          $match: {
            ...(queryDeleted),
            groupId: { $exists: true },
          },
        },
        { $sort: { createdAt: -1 } },
        {
          $group: {
            _id: "$groupId",
            mostRecentMessage: { $first: "$$ROOT" },
          },
        },
        {
          $lookup: {
            from: "groups", // Join with the groups collection
            localField: "_id",
            foreignField: "_id",
            as: "group",
          },
        },
        { $unwind: "$group" },
        {
          $addFields: {
            type: "group",
            conversation: {
              id: "$group._id",
              name: "$group.name",
              link: "$group.link",
              memberCount : "$group.memberCount",
              profilePicture: "$group.profilePicture",
              description: "$group.description"
            },
            lastMessage: "$mostRecentMessage",
          },
        },
        { $project: { group: 0 } }, // Exclude the joined `group` field
      ];
  
      // Aggregation for channels
      const channelsPipeline = [
        {
          $match: {
            ...(queryDeleted),
            channelId: { $exists: true },
          },
        },
        { $sort: { createdAt: -1 } },
        {
          $group: {
            _id: "$channelId",
            mostRecentMessage: { $first: "$$ROOT" },
          },
        },
        {
          $lookup: {
            from: "channels", // Join with the channels collection
            localField: "_id",
            foreignField: "_id",
            as: "channel",
          },
        },
        { $unwind: "$channel" },
        {
          $addFields: {
            type: "channel",
            conversation: {
              id: "$channel._id",
              name: "$channel.name",
              link: "$group.link",
              profilePicture: "$group.profilePicture",
              memberCount : "$group.memberCount",
              description: "$group.description"
            },
            lastMessage: "$mostRecentMessage",
          },
        },
        { $project: { channel: 0 } }, // Exclude the joined `channel` field
      ];
  
      // Combine all three pipelines with $unionWith and apply pagination
      const combinedPipeline = [
        { $unionWith: { coll: "messages", pipeline: directsPipeline } },
        { $unionWith: { coll: "messages", pipeline: groupsPipeline } },
        { $unionWith: { coll: "messages", pipeline: channelsPipeline } },
        { $sort: { "lastMessage.createdAt": -1 } }, // Sort by the most recent message
        { $skip: floor }, // Apply pagination (skip)
        { $limit: limit }, // Apply pagination (limit)
      ];
  
      // Run the aggregation to get the conversations
      const conversations = await MessageModel.aggregate(combinedPipeline);
  
      // Run the aggregation again without pagination to get the total count
      const totalConversations = await MessageModel.aggregate([
        { $unionWith: { coll: "messages", pipeline: directsPipeline } },
        { $unionWith: { coll: "messages", pipeline: groupsPipeline } },
        { $unionWith: { coll: "messages", pipeline: channelsPipeline } },
        { $count: "total" }, // Count the total number of conversations
      ]);
  
      const hasMore = totalConversations.length > 0 && totalConversations[0].total > floor + limit;
  
      return {
        error: null,
        response: {
          data: conversations,
          hasMore,
        },
      };
    } catch (error) {
      return {
        error: error.message || "An error occurred while fetching conversations.",
      };
    }
  }
  