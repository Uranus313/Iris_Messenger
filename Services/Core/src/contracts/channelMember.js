
import Joi from "joi";
import joiObjectid from "joi-objectid";

Joi.objectId = joiObjectid(Joi); // Enable ObjectId validation
export const validateChannelMemberPost = (data) => {
  const schema = Joi.object({
    channelId: Joi.objectId().required()
  });

  return schema.validate(data);
};

export const validateChannelMemberRemove = (data) => {
  const schema = Joi.object({
    channelId: Joi.objectId().required(),
    userId: Joi.number()
        .integer()
        .min(1) // Positive integer for member ID
        .required()
  });

  return schema.validate(data);
};
export const validateChannelChangeMemberRole = (data) => {
    const schema = Joi.object({
        userId: Joi.number()
        .integer()
        .min(1) // Positive integer for member ID
        .required(),
        channelId: Joi.objectId().required(),
      role: Joi.string()
        .valid("admin", "owner", "member") // Must be one of the allowed roles
        .required()
    }); // Require at least one field to be present
  
    return schema.validate(data);
  };  