import { GroupModel } from "../Domain/Group.js";
import { MessageModel } from "../Domain/Message.js";
import { saveMessage } from "./message.js";

export async function saveGroup(groupCreate){
    const result = {};
    groupCreate.members = [{id :groupCreate.ownerId, role:"owner"}];
    const group = new GroupModel(groupCreate);
    const response = await group.save();
    result.response = response.toJSON();
    saveMessage({messageType: "group",senderUserId : groupCreate.ownerId , text: "group created",groupId : result.response._id});
    return result;
}

export async function getGroups({id , searchParams ,limit , floor ,textSearch,sort , desc , seeDeleted }){
    const result = {};
    let sortOrder = (desc == true || desc == "true")? -1 : 1;
    if(id){
        result.response = await GroupModel.find({_id : id}).findOne();
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
        if(textSearch && textSearch != ''){
            data = await GroupModel.find({...searchParams,name:{
                $regex: textSearch,
                $options: 'i'
            } }).skip(floor).limit(limit).sort({[sort] : sortOrder} );
            let count = await GroupModel.countDocuments({...searchParams,name:{
                $regex: textSearch,
                $options: 'i'
            } });
            hasMore = count > (Number(limit) + Number(floor));
            // console.log(hasMore)
        }else{
            data = await GroupModel.find(searchParams).skip(floor).limit(limit).sort({[sort] : sortOrder} );
            let count = await GroupModel.countDocuments(searchParams);
            // console.log(count);
            // console.log(limit+floor);
            
            hasMore = count > (Number(limit) + Number(floor));
            console.log(hasMore)
        }
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


export async function deleteGroup(id){
    const result = {};
    result.response = await GroupModel.deleteOne({_id : id});
    return result;
}

export async function softDeleteGroup(id){
  const result = {};
  const response = await GroupModel.findByIdAndUpdate(id,{$set :{
    isDeleted: true,
    deletedAt: Date.now()
  }},{new : true});
    result.response = response.toJSON();
  return result;
}

export async function updateGroup(id,groupUpdate ){
    const result = {};
    
    const response = await GroupModel.findByIdAndUpdate(id,{$set :groupUpdate},{new : true});
    result.response = response.toJSON();
    return(result);
}

export async function addMemberToGroup({ groupId, userId, role = "member" }) {
  const result = {};

  try {
      // Add the member and increment the member count atomically
      const updatedGroup = await GroupModel.findByIdAndUpdate(
          groupId,
          {
              $push: { members: { id: userId, role, createdAt: new Date() } },
              $inc: { memberCount: 1 },
          },
          { new: true } // Return the updated group document
      );

      if (!updatedGroup) {
          throw new Error("Group not found.");
      }

      result.response = {
          message: "Member added successfully.",
          updatedGroup,
      };

      return result;
  } catch (error) {
      result.error = error.message || "An error occurred while adding the member.";
      return result;
  }
}

export async function removeMemberFromGroup({ groupId, userId }) {
  const result = {};

  try {
    const group = await GroupModel.findById(groupId);

    if (!group) {
      throw new Error("Group not found.");
    }

    // Check if the user is in the group's members
    const memberIndex = group.members.findIndex(member => member.id === userId);

    if (memberIndex === -1) {
      throw new Error("User is not a member of the group.");
    }
      // Remove the member and decrement the member count atomically
      const updatedGroup = await GroupModel.findByIdAndUpdate(
          groupId,
          {
              $pull: { members: { id: userId } },
              $inc: { memberCount: -1 },
          },
          { new: true } // Return the updated group document
      );

      if (!updatedGroup) {
          throw new Error("Group not found.");
      }

      

      result.response = {
          message: "Member removed successfully.",
          updatedGroup,
      };

      return result;
  } catch (error) {
      result.error = error.message || "An error occurred while removing the member.";
      return result;
  }
}


export async function getGroupsForUser({
    userId,
    searchParams = {},
    limit = 20,
    floor = 0,
    seeDeleted = false,
  }) {
    try {
      // Step 1: Build the base query to find groups where the user is a member
      const baseQuery = {
        "members.id": userId, // Check if the user is in the members array
        ...(seeDeleted ? {} : { isDeleted: { $ne: true } }), // Exclude deleted groups if necessary
        ...searchParams, // Merge additional search parameters
      };
  
      // Step 2: Find groups matching the query
      const groupIds = (
        await GroupModel.find(baseQuery, { _id: 1 }) // Fetch only the IDs of matching groups
      ).map((group) => group._id);
  
      // Step 3: Aggregate messages to find the most recent for each group
      const recentMessages = await MessageModel.aggregate([
        {
          $match: {
            groupId: { $in: groupIds }, // Filter messages by the matching group IDs
            ...(seeDeleted ? {} : { isDeleted: { $ne: true } }), // Exclude deleted messages
          },
        },
        {
          $sort: { createdAt: -1 }, // Sort messages by the most recent first
        },
        {
          $group: {
            _id: "$groupId", // Group by groupId
            mostRecentMessage: { $first: "$$ROOT" }, // Capture the entire most recent message
          },
        },
        {
          $sort: { "mostRecentMessage.createdAt": -1 }, // Sort groups by the most recent message
        },
        {
          $skip: floor, // Apply pagination
        },
        {
          $limit: limit, // Limit results
        },
      ]);
  
      const sortedGroups = await GroupModel.find({
        _id: { $in: recentMessages.map((message) => message._id) },
      });
  
      const data = recentMessages.map((messageGroup) => {
        const group = sortedGroups.find((g) => g._id.equals(messageGroup._id));
        const memberDetails = group.members.find((member) => member.id === userId);
  
        return {
          group: {
            id: group._id,
            name: group.name,
            description: group.description,
            link : group.link,
            type: group.type,
            memberCount : group.memberCount,
            status: 'group',
            profilePicture: group.profilePicture,
            createdAt: group.createdAt,
            isDeleted: group.isDeleted || false,
          },
          role: memberDetails.role, // User's role in the group
          joinedAt: memberDetails.createdAt, // When the user joined the group
          lastMessage: messageGroup.mostRecentMessage, // Include the most recent message
        };
      });  
      const totalGroups = await GroupModel.countDocuments(baseQuery);
      const hasMore = totalGroups > floor + limit;
      return {
        error: null,
        response: {
          data,
          hasMore,
        },
      };
    } catch (error) {
      return {
        error: error.message || "An error occurred while fetching groups.",
      };
    }
  }
  

export async function getUsersInGroup({ groupId, floor = 0, limit = 20, sort = "createdAt", desc = false }) {
  const result = {};
  const sortOrder = desc ? -1 : 1;

  try {
      // Find the group by its ID
      const group = await GroupModel.findById(groupId);

      if (!group) {
          result.error = "Group not found.";
          return result;
      }

      // Extract and sort members
      const sortedMembers = group.members.sort((a, b) => {
          if (sortOrder === 1) {
              return new Date(a[sort]) - new Date(b[sort]);
          } else {
              return new Date(b[sort]) - new Date(a[sort]);
          }
      });

      // Apply pagination
      const paginatedMembers = sortedMembers.slice(floor, floor + limit);

      // Format the response
      const data = paginatedMembers.map((member) => ({
          userId: member.id,
          role: member.role,
          joinedAt: member.createdAt,
      }));

      // Check if there are more members beyond the current page
      const hasMore = group.members.length > floor + limit;

      result.response = {
          data,
          hasMore,
      };

      return result;
  } catch (error) {
      result.error = error.message || "An error occurred while fetching users in the group.";
      return result;
  }
}
