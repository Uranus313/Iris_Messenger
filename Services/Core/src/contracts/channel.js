import Joi from "joi";
import joiObjectid from "joi-objectid";

Joi.objectId = joiObjectid(Joi); // Enable ObjectId validation

export const validateChannelPost = (data) => {
  const schema = Joi.object({
    description: Joi.string()
      .max(512) // Description limited to 512 characters
      .optional(),
    name: Joi.string()
      .min(1)
      .max(100) // Name limited to 1-100 characters
      .required(),
    link: Joi.string()
      .max(256) // Link limited to 256 characters
      .required(),
    type: Joi.string()
      .valid("private", "public") // Must be either "private" or "public"
      .required()
  });

  return schema.validate(data);
};
export const validateChannelEdit = (data) => {
    const schema = Joi.object({
      description: Joi.string()
        .max(512) // Description limited to 512 characters
        .optional(),
      name: Joi.string()
        .min(1)
        .max(100) // Name limited to 1-100 characters
        .optional(),
      link: Joi.string()
        .max(256) // Link limited to 256 characters
        .optional(),
      type: Joi.string()
        .valid("private", "public") // Must be either "private" or "public"
        .optional()
    }).min(1); // Require at least one field to be present
  
    return schema.validate(data);
  };