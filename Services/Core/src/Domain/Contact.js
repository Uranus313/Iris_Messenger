import mongoose from "mongoose";

const contactSchema  = new mongoose.Schema(
    {
        firstUserId: {
            type : Number ,required : true
        },
        targetUserId: {
            type : Number ,required : true
        },
        
        createdAt : {type: Date, required: true, default : Date.now()},
        isDeleted : {type: Boolean},
        deletedAt : {type: Date}
        
    }
);

export const ContactModel = mongoose.model("contacts",contactSchema);
