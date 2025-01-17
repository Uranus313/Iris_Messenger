import Joi from "joi";

export function validateUserChangeinfo(data) {
    const schema = Joi.object({
        firstName: Joi.string().min(1).max(100),
        lastName: Joi.string().min(1).max(100),
        twoStepPassword: Joi.string().min(8).max(200),
        birthDate: Joi.date(),
        isOnline: Joi.string(),
        // isBanned:Joi.boolean(),
        isDeleted:Joi.boolean(),
        lastScene:Joi.boolean(),
        bio: Joi.string(),
        username: Joi.string(),
    }).min(1);
    return schema.validate(data);
}
export function validateUserPost(data) {
    const schema = Joi.object({
        firstName: Joi.string().min(1).max(100).required(),
        lastName: Joi.string().min(1).max(100),
        email : Joi.string().email().required(),
        bio: Joi.string()
    });
    return schema.validate(data);
}
export function validateGetOTP(data) {
    const schema = Joi.object({
        
        email : Joi.string().email().required()
    });
    return schema.validate(data);
}

export function validateSendOTP(data) {
    const schema = Joi.object({
        
        email : Joi.string().email().required(),
        verificationCode : Joi.string().required()
    });
    return schema.validate(data);
}