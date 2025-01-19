import { MessageModel } from "../Domain/Message.js";

export async function saveMessage(messageCreate){
    const result = {};
    const message = new MessageModel(messageCreate);
    const response = await message.save();
    result.response = response.toJSON();
    return result;
}

export async function getMessages(id , searchParams ,limit , floor ,textSearch,sort , desc ){
    const result = {};
    let sortOrder = (desc == true || desc == "true")? -1 : 1;
    if(id){
        result.response = await MessageModel.find({_id : id}).findOne();
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

export async function updateMessage(id,messageUpdate ){
    const result = {};
    
    const response = await MessageModel.findByIdAndUpdate(id,{$set :messageUpdate},{new : true});
    result.response = response.toJSON();
    return(result);
}

