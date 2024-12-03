import Joi from "joi";

export function validateAdminChangeinfo(data) {
    const schema = Joi.object({
        firstName: Joi.string().min(1).max(100),
        lastName: Joi.string().min(1).max(100),
        password: Joi.string().min(8).max(200),
        isOnline: Joi.string(),
        isBanned:Joi.boolean(),
        isDeleted:Joi.boolean(),
        lastScene:Joi.boolean()
    }).min(1);
    return schema.validate(data);
}
export function validateAdminPost(data) {
    const schema = Joi.object({
        firstName: Joi.string().min(1).max(100).required(),
        lastName: Joi.string().min(1).max(100),
        email : Joi.string().email().required(),
        password: Joi.string().required()
    });
    return schema.validate(data);
}
export function validateAdminLogIn(data) {
    const schema = Joi.object({
        email : Joi.string().email().required(),
        password: Joi.string().required()
    });
    return schema.validate(data);
}