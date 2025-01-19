import mongoose from "mongoose";

const blockedSchema  = new mongoose.Schema(
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

export const BlockedModel = mongoose.model("blockeds",blockedSchema);
