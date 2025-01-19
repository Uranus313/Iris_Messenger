import { ContactModel } from "../Domain/Contact.js";

export async function saveContact(contactCreate){
    const result = {};
    const contact = new ContactModel(contactCreate);
    const response = await contact.save();
    result.response = response.toJSON();
    return result;
}

export async function getContacts(id , searchParams ,limit , floor ,sort , desc ){
    const result = {};
    let sortOrder = (desc == true || desc == "true")? -1 : 1;
    if(id){
        result.response = await ContactModel.find({_id : id}).findOne();
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
        
            data = await ContactModel.find(searchParams).skip(floor).limit(limit).sort({[sort] : sortOrder} );
            let count = await ContactModel.countDocuments(searchParams);
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


export async function deleteContact(id){
    const result = {};
    result.response = await ContactModel.deleteOne({_id : id});
    return result;
}

export async function updateContact(id,contactUpdate ){
    const result = {};
    
    const response = await ContactModel.findByIdAndUpdate(id,{$set :contactUpdate},{new : true});
    result.response = response.toJSON();
    return(result);
}

