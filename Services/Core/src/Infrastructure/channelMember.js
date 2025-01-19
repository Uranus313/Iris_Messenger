import { ChannelMemberModel } from "../Domain/ChannelMember.js";

export async function saveChannelMember(channelMemberCreate){
    const result = {};
    const channelMember = new ChannelMemberModel(channelMemberCreate);
    const response = await channelMember.save();
    result.response = response.toJSON();
    return result;
}

export async function getChannelMembers({id , searchParams ,limit , floor ,sort , desc, seeDeleted }){
    const result = {};
    let sortOrder = (desc == true || desc == "true")? -1 : 1;
    if(id){
        result.response = await ChannelMemberModel.find({_id : id}).findOne();
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
        
            data = await ChannelMemberModel.find(searchParams).skip(floor).limit(limit).sort({[sort] : sortOrder} );
            let count = await ChannelMemberModel.countDocuments(searchParams);
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


export async function deleteChannelMember(id){
    const result = {};
    result.response = await ChannelMemberModel.deleteOne({_id : id});
    return result;
}



export async function updateChannelMember(id,channelMemberUpdate ){
    const result = {};
    
    const response = await ChannelMemberModel.findByIdAndUpdate(id,{$set :channelMemberUpdate},{new : true});
    result.response = response.toJSON();
    return(result);
}

