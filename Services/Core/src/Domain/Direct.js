import mongoose from "mongoose";

const directSchema  = new mongoose.Schema(
    {
        firstUserId: {
            type : Number ,required : true
        },
        
        secondUserId: {
            type : Number ,required : true
        },

        createdAt : {type: Date, required: true, default : Date.now()},
        isDeleted : {type: Boolean},
        deletedAt : {type: Date}
        
    }
);

export const DirectModel = mongoose.model("directs",directSchema);
