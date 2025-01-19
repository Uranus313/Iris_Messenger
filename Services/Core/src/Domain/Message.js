import mongoose from "mongoose";

const messageSchema  = new mongoose.Schema(
    {
        messageType: {type : String , enum: ["group" , "channel","direct"],required : true},
        senderUserId: {
            type : Number 
        },
        media: {type: String},
        text: {type: String},
        replyTo: {type : mongoose.Schema.Types.ObjectId , ref: "messages"   },
        forwardedFrom: {type : mongoose.Schema.Types.ObjectId , ref: "messages"   },
        groupId: {type : mongoose.Schema.Types.ObjectId , ref: "groups"   },
        channelId: {type : mongoose.Schema.Types.ObjectId, ref: "channels" },
        directId: {type : mongoose.Schema.Types.ObjectId, ref: "directs" },
        createdAt : {type: Date, required: true, default : Date.now()},
        isDeleted : {type: Boolean},
        deletedAt : {type: Date}
        
    }
);

export const MessageModel = mongoose.model("messages",messageSchema);
