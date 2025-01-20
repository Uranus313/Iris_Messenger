import Joi from "joi";

export const validateDirectPost = (data) => {
  const schema = Joi.object({
    secondUserId: Joi.number()
      .integer()
      .min(1) // Must be a positive integer
      .required()// Optional deletion timestamp
  });

  return schema.validate(data);
};
