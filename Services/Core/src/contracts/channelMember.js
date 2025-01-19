import Joi from "joi";
Joi.objectId = joiObjectid(Joi); // Enable ObjectId validation
import joiObjectid from "joi-objectid";
export const validateChannelMemberPost = (data) => {
  const schema = Joi.object({
    channelId: JoiJoi.objectId().required()
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