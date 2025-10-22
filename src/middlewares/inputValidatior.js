const Joi = require("joi");

const createUserSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(100).required(),
    phone: Joi.string()
        .pattern(/^[0-9]{10,15}$/)
        .allow(null, ''),    
});

const validateUser = (req, res, next) => {
    const {error} = createUserSchema.validate(req.body);
    if (error){
        return res.status(400).json({
            message: error.details[0].message
        });
    }
    next();
}

module.exports = validateUser;