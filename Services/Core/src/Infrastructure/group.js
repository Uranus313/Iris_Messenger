import { GroupModel } from "../Domain/Group.js";

export async function saveGroup(groupCreate){
    const result = {};
    const group = new GroupModel(groupCreate);
    const response = await group.save();
    result.response = response.toJSON();
    return result;
}

export async function getGroups({id , searchParams ,limit , floor ,textSearch,sort , desc , seeDeleted }){
    const result = {};
    let sortOrder = (desc == true || desc == "true")? -1 : 1;
    if(id){
        result.response = await GroupModel.find({_id : id}).findOne();
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
            data = await GroupModel.find({...searchParams,name:{
                $regex: textSearch,
                $options: 'i'
            } }).skip(floor).limit(limit).sort({[sort] : sortOrder} );
            let count = await GroupModel.countDocuments({...searchParams,lastName:{
                $regex: textSearch,
                $options: 'i'
            } });
            hasMore = count > (Number(limit) + Number(floor));
            // console.log(hasMore)
        }else{
            data = await GroupModel.find(searchParams).skip(floor).limit(limit).sort({[sort] : sortOrder} );
            let count = await GroupModel.countDocuments(searchParams);
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


export async function deleteGroup(id){
    const result = {};
    result.response = await GroupModel.deleteOne({_id : id});
    return result;
}

export async function softDeleteGroup(id){
  const result = {};
  const response = await GroupModel.findByIdAndUpdate(id,{$set :{
    isDeleted: true,
    deletedAt: Date.now()
  }},{new : true});
    result.response = response.toJSON();
  return result;
}

export async function updateGroup(id,groupUpdate ){
    const result = {};
    
    const response = await GroupModel.findByIdAndUpdate(id,{$set :groupUpdate},{new : true});
    result.response = response.toJSON();
    return(result);
}

