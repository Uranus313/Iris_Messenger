import mongoose from "mongoose";

const groupSchema  = new mongoose.Schema(
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
        members:{type: [{
            id: Number,
            role : {type: String,enum: ["admin" , "owner","member"]},
            createdAt: {type: Date, required: true, default : Date.now()},
        }] ,required : true},
        memberCount: {type: Number , required: true},

        createdAt : {type: Date, required: true, default : Date.now()},
        isDeleted : {type: Boolean},
        deletedAt : {type: Date},
        isBanned : {type: Boolean},
        bannedAt : {type: Date},
        
    }
);

export const GroupModel = mongoose.model("groups",groupSchema);
