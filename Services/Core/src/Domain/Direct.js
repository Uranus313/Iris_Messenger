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
directSchema.virtual("status").get(() => {
    return "direct";
});

directSchema.set('toJSON',{virtuals: true});
directSchema.set('toObject',{virtuals: true});
export const DirectModel = mongoose.model("directs",directSchema);
