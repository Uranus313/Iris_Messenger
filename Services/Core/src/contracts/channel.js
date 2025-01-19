import Joi from "joi";
import joiObjectid from "joi-objectid";

Joi.objectId = joiObjectid(Joi); // Enable ObjectId validation

export const validateGroupPost = (data) => {
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
      .optional(),
    type: Joi.string()
      .valid("private", "public") // Must be either "private" or "public"
      .required(),
    profilePicture: Joi.string()
      .max(512) // URL/path for profile picture limited to 512 characters
      .optional()
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
        .optional(),
      profilePicture: Joi.string()
        .max(512) // URL/path for profile picture limited to 512 characters
        .optional(),
    }).min(1); // Require at least one field to be present
  
    return schema.validate(data);
  };