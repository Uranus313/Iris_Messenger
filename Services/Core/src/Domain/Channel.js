import mongoose from "mongoose";

const channelSchema  = new mongoose.Schema(
    {
        ownerId: {
            type : Number ,required : true
        },
        description: {type: String},
        name: {type: String,required : true},
        link: {type: String},
        type: {type: String,enum: ["private" , "public"]},
        profilePicture: {
            type: String
        },
        memberCount: {type: Number , required: true},
        createdAt : {type: Date, required: true, default : Date.now()},
        isDeleted : {type: Boolean},
        deletedAt : {type: Date},
        isBanned : {type: Boolean},
        bannedAt : {type: Date}
        
    }
);

export const ChannelModel = mongoose.model("channels",channelSchema);
