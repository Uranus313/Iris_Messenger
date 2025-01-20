import { ChannelModel } from "../Domain/Channel.js";
import { ChannelMemberModel } from "../Domain/ChannelMember.js";
import mongoose from 'mongoose';
import { MessageModel } from "../Domain/Message.js";
export async function saveChannelMember(channelMemberCreate){
    const result = {};
    const channelMember = new ChannelMemberModel(channelMemberCreate);
    const response = await channelMember.save();
    result.response = response.toJSON();
    return result;
}

export async function getChannelMembers({id , searchParams ,limit , floor ,sort , desc, seeDeleted }){
    const result = {};
    let sortOrder = (desc == true || desc == "true")? -1 : 1;
    if(id){
        result.response = await ChannelMemberModel.find({_id : id}).findOne();
        if(result.response){
            result.response = result.response.toJSON();
        }
        return result;
    }else{
      if (!seeDeleted) {
        searchParams = {
            ...searchParams,
            $or: [
                { deleted: { $exists: false } }, // Field does not exist
                { deleted: null },              // Field is null
                { deleted: false }              // Field is explicitly false
            ]
        };
    }
        let data = null;
        let hasMore = false;
        if(!limit){
            limit = 20;
        }
        
            data = await ChannelMemberModel.find(searchParams).skip(floor).limit(limit).sort({[sort] : sortOrder} );
            let count = await ChannelMemberModel.countDocuments(searchParams);
            // console.log(count);
            // console.log(limit+floor);
            
            hasMore = count > (Number(limit) + Number(floor));
            console.log(hasMore)
        
        for (let index = 0; index < data.length; index++) {
            data[index] = data[index].toJSON();
            delete data[index].password;
        }
        result.response = {
            data: data,
            hasMore: hasMore
        }
        return result;
    }
}


export async function deleteChannelMember(id){
    const result = {};
    result.response = await ChannelMemberModel.deleteOne({_id : id});
    return result;
}



export async function updateChannelMember(id,channelMemberUpdate ){
    const result = {};
    
    const response = await ChannelMemberModel.findByIdAndUpdate(id,{$set :channelMemberUpdate},{new : true});
    result.response = response.toJSON();
    return(result);
}
export async function getUserChannels(userId, { limit = 20, skip = 0, sort = "joinedAt", desc = false } = {}) {
  const result = {};
  const sortOrder = desc ? -1 : 1;

  const userChannels = await ChannelMemberModel.find({ userId })
      .populate("channelId") // Fetch the details of the channel if needed
      .skip(skip)
      .limit(limit)
      .sort({ [sort]: sortOrder });

  result.response = userChannels.map((entry) => ({
      channel: entry.channelId, // Populated channel details
      role: entry.role,
      joinedAt: entry.joinedAt,
  }));

  return result;
}

export async function getChannelsForUser({
    userId,
    searchParams = {},
    limit = 20,
    floor = 0,
    seeDeleted = false,
  }) {
    try {
      // Step 1: Build the base query for the user's channel membership
      const baseQuery = {
        "user.id": userId, // Check if the user is a member
      };
  
      // Step 2: Fetch the user's channel memberships
      const channelMemberships = await ChannelMemberModel.find(baseQuery, { channelId: 1, user: 1, createdAt: 1 });
      const channelIds = channelMemberships.map((membership) => membership.channelId);
  
      // Step 3: Aggregate messages to find the most recent for each channel
      const recentMessages = await MessageModel.aggregate([
        {
          $match: {
            channelId: { $in: channelIds }, // Filter messages by the user's channels
            ...(seeDeleted ? {} : { isDeleted: { $ne: true } }), // Exclude deleted messages
          },
        },
        {
          $sort: { createdAt: -1 }, // Sort messages by the most recent first
        },
        {
          $group: {
            _id: "$channelId", // Group by channelId
            mostRecentMessage: { $first: "$$ROOT" }, // Capture the entire most recent message
          },
        },
        {
          $lookup: {
            from: "channels", // Join with the channels collection
            localField: "_id",
            foreignField: "_id",
            as: "channelDetails",
          },
        },
        {
          $unwind: "$channelDetails", // Unwind the joined channel details
        },
        {
          $match: {
            ...searchParams, // Apply additional search parameters on the channel details
            ...(seeDeleted ? {} : { "channelDetails.isDeleted": { $ne: true } }), // Exclude deleted channels
          },
        },
        {
          $sort: { "mostRecentMessage.createdAt": -1 }, // Sort channels by the most recent message
        },
        {
          $skip: floor, // Apply pagination
        },
        {
          $limit: limit, // Limit results
        },
      ]);
  
      // Step 4: Format the response with channel details and recent message
      const data = recentMessages.map((messageGroup) => {
        const membership = channelMemberships.find((m) => m.channelId.equals(messageGroup._id));
  
        return {
          channel: {
            id: messageGroup.channelDetails._id,
            name: messageGroup.channelDetails.name,
            description: messageGroup.channelDetails.description,
            type: messageGroup.channelDetails.type,
            link : messageGroup.channelDetails.link,
            status: "channel",
            memberCount : messageGroup.channelDetails.memberCount,
            profilePicture: messageGroup.channelDetails.profilePicture,
            createdAt: messageGroup.channelDetails.createdAt,
            isDeleted: messageGroup.channelDetails.isDeleted || false,
          },
          role: membership.user.role, // User's role in the channel
          joinedAt: membership.createdAt, // When the user joined the channel
          lastMessage: messageGroup.mostRecentMessage, // Include the most recent message
        };
      });
  
      // Step 5: Determine if there are more results for pagination
      const totalChannels = await ChannelMemberModel.countDocuments(baseQuery);
      const hasMore = totalChannels > floor + limit;
  
      return {
        error: null,
        response: {
          data,
          hasMore,
        },
      };
    } catch (error) {
      return {
        error: error.message || "An error occurred while fetching channels.",
      };
    }
  }
  
export async function addUserToChannel({ userId, role = "member", channelId }) {
  const result = {};

  // Start a session for atomic operations
  // const session = await mongoose.startSession();
  // session.startTransaction();

  try {
    console.log("started")
      // Check if the user is already a member of the channel
      const existingMember = await ChannelMemberModel.findOne({ 
          "user.id": userId, 
          channelId 
      });
      
      if (existingMember) {
          throw new Error("User is already a member of this channel.");
      }

      // Create a new channel member
      const newMember = new ChannelMemberModel({
          user: {
              id: userId,
              role: role, // Default is "member"
          },
          channelId,
      });

      // Save the new member
      await newMember.save();

      // Increment the channel's member count
      const updatedChannel = await ChannelModel.findByIdAndUpdate(
          channelId,
          { $inc: { memberCount: 1 } }, // Increment member count by 1
          { new: true} // Return the updated channel document
      );

      // // Commit the transaction
      // await session.commitTransaction();
      // session.endSession();

      result.response = {
          message: "User added to channel successfully."
      };
      console.log("succeeded")

      return result;
  } catch (error) {
    console.log("failed")
    console.log(error);
      // Abort the transaction in case of error
      // await session.abortTransaction();
      // session.endSession();

      result.error = error.message || "An error occurred while adding the user to the channel.";
      return result;
  }
}

export async function removeUserFromChannel({ userId, channelId }) {
  const result = {};

  // Start a session for atomic operations
  // const session = await mongoose.startSession();
  // session.startTransaction();

  try {
      // Check if the user is a member of the channel
      const existingMember = await ChannelMemberModel.findOne({ 
          "user.id": userId, 
          channelId 
      });

      if (!existingMember) {
          throw new Error("User is not a member of this channel.");
      }

      // Remove the user from the channel
      await ChannelMemberModel.deleteOne({ 
          "user.id": userId, 
          channelId 
      });

      // Decrement the channel's member count
      const updatedChannel = await ChannelModel.findByIdAndUpdate(
          channelId,
          { $inc: { memberCount: -1 } }, // Decrement member count by 1
          { new: true } // Return the updated channel document
      );

      // Commit the transaction
      // await session.commitTransaction();
      // session.endSession();

      result.response = {
          message: "User removed from channel successfully."
      };

      return result;
  } catch (error) {
      // Abort the transaction in case of error
      // await session.abortTransaction();
      // session.endSession();

      result.error = error.message || "An error occurred while removing the user from the channel.";
      return result;
  }
}

export async function getUsersInChannel({ channelId, floor = 0, limit = 20, sort = "createdAt", desc = false, seeDeleted = false }) {
  const result = {};
  const sortOrder = desc ? -1 : 1;

  try {
      // Base query to find users in the channel

      const baseQuery = {
        
          channelId : channelId,
          ...(seeDeleted ? {} : { isDeleted: { $ne: true } }), // Exclude deleted users if necessary
      };

      // Fetch channel members with pagination and sorting
      const members = await ChannelMemberModel.find(baseQuery)
          .skip(floor)
          .limit(limit)
          .sort({ [sort]: sortOrder });

      // Format the response
      console.log(channelId);
      console.log(members);
      const data = members.map((member) => ({
          userId: member.user.id,
          role: member.user.role,
          joinedAt: member.createdAt,
          isDeleted: member.isDeleted || false,
      }));

      // Count total documents for pagination
      const totalUsers = await ChannelMemberModel.countDocuments(baseQuery);
      const hasMore = totalUsers > floor + limit;

      result.response = {
          data,
          hasMore,
      };

      return result;
  } catch (error) {
      result.error = error.message || "An error occurred while fetching users in the channel.";
      return result;
  }
}
