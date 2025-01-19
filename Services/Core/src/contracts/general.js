import Joi from "joi";
import joiObjectid from "joi-objectid";

Joi.objectId = joiObjectid(Joi); // Enable ObjectId validation

export const validateObjectId = (data) => {
  const schema = Joi.objectId().required();

  return schema.validate(data);
};
export const validateNumericId = (data) => {
    const schema = Joi.number().integer().min(1).required()
  
    return schema.validate(data);
  };
