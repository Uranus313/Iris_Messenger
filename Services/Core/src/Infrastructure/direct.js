import { DirectModel } from "../Domain/Direct.js";

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


export async function getDirectConversationsForUser({ userId, floor = 0, limit = 20 }) {
    try {
        // Query to find all directs where the user is either firstUserId or secondUserId
        const conversations = await DirectModel.find({
            $or: [
                { firstUserId: userId },
                { secondUserId: userId }
            ],
            isDeleted: { $ne: true } // Exclude deleted conversations
        })
        .skip(floor) // Skip based on the floor value (pagination)
        .limit(limit) // Limit the number of results
        .sort({ createdAt: -1 }); // Optional: Sort by creation date, latest first

        // Map the results to get the direct_id and the other user's ID
        const result = conversations.map(conversation => {
            return {
                _id: conversation._id, // The direct conversation ID
                user: conversation.firstUserId === userId ? conversation.secondUserId : conversation.firstUserId
            };
        });

        // Get total count for pagination purposes
        const totalCount = await DirectModel.countDocuments({
            $or: [
                { firstUserId: userId },
                { secondUserId: userId }
            ],
            isDeleted: { $ne: true }
        });

        const hasMore = totalCount > floor + limit;

        return { error: null, response: result, hasMore };

    } catch (error) {
        return { error: error.message || "An error occurred while fetching the direct conversations." };
    }
}
