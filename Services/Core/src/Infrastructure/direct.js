import { DirectModel } from "../Domain/Direct.js";

export async function saveDirect(directCreate){
    const result = {};
    const direct = new DirectModel(directCreate);
    const response = await direct.save();
    result.response = response.toJSON();
    return result;
}

export async function getDirects(id , searchParams ,limit , floor ,sort , desc ){
    const result = {};
    let sortOrder = (desc == true || desc == "true")? -1 : 1;
    if(id){
        result.response = await DirectModel.find({_id : id}).findOne();
        if(result.response){
            result.response = result.response.toJSON();
        }
        return result;
    }else{
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

export async function updateDirect(id,directUpdate ){
    const result = {};
    
    const response = await DirectModel.findByIdAndUpdate(id,{$set :directUpdate},{new : true});
    result.response = response.toJSON();
    return(result);
}

