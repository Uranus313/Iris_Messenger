import Joi from "joi";

export function validateSuperAdminLogIn(data) {
    const schema = Joi.object({
        email : Joi.string().required(),
        password: Joi.string().required()
    });
    return schema.validate(data);
}