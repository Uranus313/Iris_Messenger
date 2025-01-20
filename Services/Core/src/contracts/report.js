import Joi from "joi";
import joiObjectid from "joi-objectid";

Joi.objectId = joiObjectid(Joi); // Add objectId validation to Joi

export const validateReportPost = (data) => {
  const schema = Joi.object({
    reason: Joi.string().required(), // 'reason' is required
    reportedType: Joi.string()
      .valid("group", "channel", "message", "user") // Allowed values
      .required(),
    reportedUserId: Joi.number().integer()
    .min(1) // Ensure valid positive user IDs
    .when("reportedType", {
        is: "user",
        then: Joi.required(), // Required if `reportedType` is "group"
        otherwise: Joi.forbidden(), // Forbidden otherwise
      }),
    reportedGroupId: Joi.objectId().when("reportedType", {
      is: "group",
      then: Joi.required(), // Required if `reportedType` is "group"
      otherwise: Joi.forbidden(), // Forbidden otherwise
    }),
    reportedChannelId: Joi.objectId().when("reportedType", {
      is: "channel",
      then: Joi.required(), // Required if `reportedType` is "channel"
      otherwise: Joi.forbidden(), // Forbidden otherwise
    }),
    reportedMessageId: Joi.objectId().when("reportedType", {
      is: "message",
      then: Joi.required(), // Required if `reportedType` is "message"
      otherwise: Joi.forbidden(), // Forbidden otherwise
    })
  });

  return schema.validate(data);
};
