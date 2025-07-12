import Joi from "joi";

// frunção que faz uma validação de nome e senha (mínimo 4 caracteres)

const validation = Joi.object({
    name: Joi.string().min(4).required(), 
    password: Joi.alternatives().try(
        Joi.string().min(4),
        Joi.number().integer().$(1000)
    ).required()
})

export const validateUser = (req, res, next) => {
    const { error } = validation.validate(req.body)
    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        })
    }
    next()
}



