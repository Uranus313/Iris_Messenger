import Joi from "joi";
import joiObjectid from "joi-objectid";

Joi.objectId = joiObjectid(Joi); // Add ObjectId validation

export const validateMessagePost = (data) => {
  const schema = Joi.object({
    messageType: Joi.string()
      .valid("group", "channel", "direct") // Allowed message types
      .required(),
    media: Joi.string()
      .max(512) // Limit media string length to 512 characters (e.g., URLs or paths)
      .optional(),
    text: Joi.string()
      .max(2048) // Limit text message to 2048 characters
      .optional(),
    replyTo: Joi.objectId().optional(), // Optional reply to another message
    forwardedFrom: Joi.objectId().optional(), // Optional forwarded message
    groupId: Joi.objectId().when("messageType", {
      is: "group",
      then: Joi.required(), // Required if messageType is "group"
      otherwise: Joi.forbidden(), // Forbidden otherwise
    }),
    channelId: Joi.objectId().when("messageType", {
      is: "channel",
      then: Joi.required(), // Required if messageType is "channel"
      otherwise: Joi.forbidden(), // Forbidden otherwise
    }),
    directId: Joi.objectId().when("messageType", {
      is: "direct",
      then: Joi.required(), // Required if messageType is "direct"
      otherwise: Joi.forbidden(), // Forbidden otherwise
    })
  });

  return schema.validate(data);
};
export const validateMessageEdit = (data) => {
    const schema = Joi.object({
      
      
      text: Joi.string()
        .max(2048) // Limit text message to 2048 characters
        .optional()
    });
  
    return schema.validate(data);
  };
  