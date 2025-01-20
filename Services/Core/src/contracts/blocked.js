import Joi from "joi";

export const validateBlockedPost = (data) => {
  const schema = Joi.object({
    targetUserId: Joi.number()
      .integer()
      .min(1) // Must be a positive integer
      .required()// Optional deletion timestamp
  });

  return schema.validate(data);
};
