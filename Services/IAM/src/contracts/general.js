import Joi from "joi";


export function validateEmail(data) {
    const schema = Joi.string().email().required()
    
    return schema.validate(data);
}