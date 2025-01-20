import mongoose from "mongoose";

const groupSchema  = new mongoose.Schema(
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
        members:{type: [{
            id: {type: Number, required: true},
            role : {type: String,enum: ["admin" , "owner","member"] , default: "member"},
            createdAt: {type: Date, required: true, default : Date.now()},
        }] ,required : true},
        memberCount: {type: Number , required: true ,default: 1},

        createdAt : {type: Date, required: true, default : Date.now()},
        isDeleted : {type: Boolean},
        deletedAt : {type: Date},
        isBanned : {type: Boolean},
        bannedAt : {type: Date}
        
    }
);
groupSchema.virtual("status").get(() => {
    return "group";
});

groupSchema.set('toJSON',{virtuals: true});
groupSchema.set('toObject',{virtuals: true});
export const GroupModel = mongoose.model("groups",groupSchema);
