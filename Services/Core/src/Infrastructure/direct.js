import { DirectModel } from "../Domain/Direct.js";
import { MessageModel } from "../Domain/Message.js";

export async function saveDirect(directCreate){
    const result = {};
    const direct = new DirectModel(directCreate);
    const response = await direct.save();
    result.response = response.toJSON();
    return result;
}

export async function getDirects({id , searchParams ,limit , floor ,sort , desc , seeDeleted }){
    const result = {};
    let sortOrder = (desc == true || desc == "true")? -1 : 1;
    if(id){
        result.response = await DirectModel.find({_id : id}).findOne();
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
        
            data = await DirectModel.find(searchParams).skip(floor).limit(limit).sort({[sort] : sortOrder} );
            let count = await DirectModel.countDocuments(searchParams);
            // console.log(count);
            // console.log(limit+floor);
            
            hasMore = count > (Number(limit) + Number(floor));
            console.log(hasMore)
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


export async function deleteDirect(id){
    const result = {};
    result.response = await DirectModel.deleteOne({_id : id});
    return result;
}


export async function softDeleteDirect(id){
  const result = {};
  const response = await DirectModel.findByIdAndUpdate(id,{$set :{
    isDeleted: true,
    deletedAt: Date.now()
  }},{new : true});
    result.response = response.toJSON();
  return result;
}


export async function updateDirect(id,directUpdate ){
    const result = {};
    
    const response = await DirectModel.findByIdAndUpdate(id,{$set :directUpdate},{new : true});
    result.response = response.toJSON();
    return(result);
}


export async function getDirectConversationsForUser({ userId, floor = 0, limit = 20, seeDeleted = false }) {
    try {
      // Aggregation pipeline
      const directConversations = await DirectModel.aggregate([
        // Stage 1: Match directs where the user is either firstUserId or secondUserId
        {
          $match: {
            $or: [
              { firstUserId: userId },
              { secondUserId: userId }
            ],
            ...(seeDeleted ? {} : { isDeleted: { $ne: true } }) // Exclude deleted conversations if `seeDeleted` is false
          },
        },
        // Stage 2: Lookup the most recent message for each direct conversation
        {
          $lookup: {
            from: "messages", // Name of the MessageModel collection
            let: { directId: "$_id" }, // Pass the direct ID to the lookup stage
            pipeline: [
              { $match: { $expr: { $eq: ["$directId", "$$directId"] } } }, // Match messages for the direct conversation
              ...(seeDeleted ? [] : [{ $match: { isDeleted: { $ne: true } } }]), // Exclude deleted messages
              { $sort: { createdAt: -1 } }, // Sort messages by most recent
              { $limit: 1 }, // Get only the most recent message
            ],
            as: "lastMessage", // Output field for the lookup result
          },
        },
        // Stage 3: Unwind the lastMessage array (if it exists)
        {
          $unwind: {
            path: "$lastMessage",
            preserveNullAndEmptyArrays: true, // Keep directs without messages
          },
        },
        // Stage 4: Sort conversations by the last message's createdAt timestamp
        {
          $sort: { "lastMessage.createdAt": -1 },
        },
        // Stage 5: Pagination using skip and limit
        {
          $skip: floor,
        },
        {
          $limit: limit,
        },
        // Stage 6: Project the desired fields in the final result
        {
          $project: {
            _id: 1, // Direct conversation ID
            user: {
              $cond: {
                if: { $eq: ["$firstUserId", userId] },
                then: "$secondUserId",
                else: "$firstUserId",
              },
            }, // The other user's ID
            lastMessage: 1, // Include the last message object
          },
        },
      ]);
  
      // Check if there are more results for pagination
      const totalDirects = await DirectModel.countDocuments({
        $or: [
          { firstUserId: userId },
          { secondUserId: userId }
        ],
        ...(seeDeleted ? {} : { isDeleted: { $ne: true } }),
      });
  
      const hasMore = totalDirects > floor + limit;
  
      return { error: null, response: {
        data :directConversations,
        hasMore :hasMore,
      }, };
    } catch (error) {
      return { error: error.message || "An error occurred while fetching the direct conversations." };
    }
  }
  