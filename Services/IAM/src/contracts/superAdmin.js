import Joi from "joi";

export function validateSuperAdminLogIn(data) {
    const schema = Joi.object({
        email : Joi.string().email().required(),
        password: Joi.string().required()
    });
    return schema.validate(data);
}