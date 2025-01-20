import mongoose from "mongoose";

const channelSchema  = new mongoose.Schema(
    {
        ownerId: {
            type : Number ,required : true
        },
        description: {type: String},
        name: {type: String,required : true},
        link: {type: String,required : true , unique : true},
        type: {type: String,enum: ["private" , "public"]},
        profilePicture: {
            type: String
        },
        memberCount: {type: Number , required: true,default: 0},
        createdAt : {type: Date, required: true, default : Date.now()},
        isDeleted : {type: Boolean},
        deletedAt : {type: Date},
        isBanned : {type: Boolean},
        bannedAt : {type: Date}
        
    }
);
channelSchema.virtual("status").get(() => {
    return "channel";
});

channelSchema.set('toJSON',{virtuals: true});
channelSchema.set('toObject',{virtuals: true});
export const ChannelModel = mongoose.model("channels",channelSchema);
