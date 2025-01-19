import mongoose from "mongoose";

const reportSchema  = new mongoose.Schema(
    {
        reason: {type : String ,required : true},
        reportedType: {type : String , enum: ["group" , "channel","message","user"],required : true},
        senderUserId: {
            type : Number 
        },
        reportedUserId: {
            type : Number  , required: true
        },
        reportedGroupId: {type : mongoose.Schema.Types.ObjectId , ref: "groups"   },
        reportedChannelId: {type : mongoose.Schema.Types.ObjectId, ref: "channels" },
        reportedMessageId: {type : mongoose.Schema.Types.ObjectId, ref: "messages" },
        createdAt : {type: Date, required: true, default : Date.now()},
        isDeleted : {type: Boolean},
        deletedAt : {type: Date},
        

        isSeen: {type: Boolean}
        
    }
);

export const ReportModel = mongoose.model("reports",reportSchema);
