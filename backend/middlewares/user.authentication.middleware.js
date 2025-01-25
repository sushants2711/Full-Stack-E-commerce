import joi from "joi";

export const signinMiddleWare = async (req, res, next) => {

    const schema = joi.object({
        name: joi.string().min(2).max(30).required().trim(),
        email: joi.string().email().required().trim(),
        password: joi.string().min(8).max(40).required(),
        confirmpassword: joi.string().min(8).max(40).required(),
        cartdata: joi.object().default({})
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res
            .status(400)
            .json({
                success: false,
                message: "Validation failed",
                error: error.details[0].message
            })
    }
    next()
}

export const loginMiddleWare = async (req, res, next) => {
    const schema = joi.object({
        email: joi.string().email().required().trim(),
        password: joi.string().min(8).max(40).required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res
            .status(400)
            .json({
                success: false,
                message: "Validation failed",
                error: error.details[0].message
            })
    }
    next()
}

export const verifymiddleware = async (req, res, next) => {
    const schema = joi.object({
        code: joi.string().min(6).max(6).required().trim()
    })
    const { error } = schema.validate(req.body);
    if (error) {
        return res
            .status(400).json({
                success: false,
                message: "Otp must be 6 character long",
                error: error.details[0].message
            })
    }
    next()
}

export const forgotPasswordMiddleWare = async (req, res, next) => {
    const schema = joi.object({
        email: joi.string().email().required().trim()
    })
    const { error } = schema.validate(req.body);
    if (error) {
        return res
            .status(400)
            .json({
                success: false,
                message: "Please enter correct email",
                error: error.details[0].message
            })
    }
    next()
}

export const resetPasswordMiddleware = async (req, res, next) => {
    const schema = joi.object({
        code: joi.string().min(6).max(6).required().trim(),
        password: joi.string().min(8).max(40).required(),
        confirmpassword: joi.string().min(8).max(40).required()
    })
    const { error } = schema.validate(req.body);
    if (error) {
        return res
            .status(400)
            .json({
                success: false,
                message: "authentication failed for reset password",
                error: error.details[0].message
            })
    }
    next()
}

export const deleteUserMiddleware = async (req, res, next) => {
    const schema = joi.object({
        name: joi.string().min(2).max(30).required().trim(),
        email: joi.string().email().required().trim(),
        password: joi.string().min(8).max(40).required(),
    })
    const { error } = schema.validate(req.body);
    if (error) {
        return res
            .status(200)
            .json({
                success: false,
                message: "User error occured",
                error: error.details[0].message
            })
    }
    next()
}