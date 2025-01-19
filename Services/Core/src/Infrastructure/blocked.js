import { BlockedModel } from "../Domain/Blocked.js";

export async function saveBlocked(blockedCreate){
    const result = {};
    const blocked = new BlockedModel(blockedCreate);
    const response = await blocked.save();
    result.response = response.toJSON();
    return result;
}

export async function getBlockeds({id , searchParams ,limit , floor ,sort , desc ,seeDeleted} ){
    const result = {};
    let sortOrder = (desc == true || desc == "true")? -1 : 1;
    if(id){
        result.response = await BlockedModel.find({_id : id}).findOne();
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
        
            data = await BlockedModel.find(searchParams).skip(floor).limit(limit).sort({[sort] : sortOrder} );
            let count = await BlockedModel.countDocuments(searchParams);
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


export async function deleteBlocked(id){
    const result = {};
    result.response = await BlockedModel.deleteOne({_id : id});
    return result;
}

export async function softDeleteBlocked(id){
  const result = {};
  const response = await BlockedModel.findByIdAndUpdate(id,{$set :{
    isDeleted: true,
    deletedAt: Date.now()
  }},{new : true});
    result.response = response.toJSON();
  return result;
}



export async function updateBlocked(id,blockedUpdate ){
    const result = {};
    
    const response = await BlockedModel.findByIdAndUpdate(id,{$set :blockedUpdate},{new : true});
    result.response = response.toJSON();
    return(result);
}

