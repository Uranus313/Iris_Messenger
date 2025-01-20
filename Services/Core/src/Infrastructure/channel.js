import { ChannelModel } from "../Domain/Channel.js";
import { addUserToChannel } from "./channelMember.js";

export async function saveChannel(channelCreate){
    const result = {};
    const channel = new ChannelModel(channelCreate);
    const response = await channel.save();

    result.response = response.toJSON();
    addUserToChannel({userId : channelCreate.ownerId , role: "owner" , channelId : result.response._id});

    return result;
}

export async function getChannels({id , searchParams ,limit , floor ,textSearch,sort , desc , seeDeleted }){
    const result = {};
    let sortOrder = (desc == true || desc == "true")? -1 : 1;
    if(id){
        result.response = await ChannelModel.find({_id : id}).findOne();
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
            data = await ChannelModel.find({...searchParams,name:{
                $regex: textSearch,
                $options: 'i'
            } }).skip(floor).limit(limit).sort({[sort] : sortOrder} );
            let count = await ChannelModel.countDocuments({...searchParams,name:{
                $regex: textSearch,
                $options: 'i'
            } });
            hasMore = count > (Number(limit) + Number(floor));
            // console.log(hasMore)
        }else{
            data = await ChannelModel.find(searchParams).skip(floor).limit(limit).sort({[sort] : sortOrder} );
            let count = await ChannelModel.countDocuments(searchParams);
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


export async function deleteChannel(id){
    const result = {};
    result.response = await ChannelModel.deleteOne({_id : id});
    return result;
}

export async function softDeleteChannel(id){
  const result = {};
  const response = await ChannelModel.findByIdAndUpdate(id,{$set :{
    isDeleted: true,
    deletedAt: Date.now()
  }},{new : true});
    result.response = response.toJSON();
  return result;
}

export async function updateChannel(id,channelUpdate ){
    const result = {};
    
    const response = await ChannelModel.findByIdAndUpdate(id,{$set :channelUpdate},{new : true});
    result.response = response.toJSON();
    return(result);
}

