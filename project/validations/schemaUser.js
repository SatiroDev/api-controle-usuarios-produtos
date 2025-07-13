import Joi from "joi";

// função que faz uma validação de nome e senha (mínimo 4 caracteres)

const validation = Joi.object({
    name: Joi.string().min(4).required(), 
    password: Joi.alternatives().try(
        Joi.string().min(4),
        Joi.number().integer().min(1000)
    ).required(),
    type: Joi.string().required()
})

export const validateUser = (req, res, next) => {
    const { error } = validation.validate(req.body)
    if (error) {
        const err = new Error(error.details[0].message)
        err.status = 400
        return next(err)
    }
    next()
}



