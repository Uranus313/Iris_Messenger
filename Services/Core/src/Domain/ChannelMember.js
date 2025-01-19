import mongoose from "mongoose";

const channelMemberSchema  = new mongoose.Schema(
    {
        userId: {
            type : Number ,required : true
        },
        channelId: {type : mongoose.Schema.Types.ObjectId, ref: "channels" , required : true },
        
        createdAt : {type: Date, required: true, default : Date.now()},
        isDeleted : {type: Boolean},
        deletedAt : {type: Date}
        
    }
);

export const ChannelMemberModel = mongoose.model("channelMembers",channelMemberSchema);
