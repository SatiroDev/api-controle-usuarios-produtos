import Joi from 'joi'

const validation = Joi.object({
    name: Joi.string().min(3).required(),
    password: Joi.alternatives().try(
        Joi.string().min(4),
        Joi.number().integer().min(1000)
    ).required()
})

export const validateUser = (req, res, next) => {
    const { error } = validation.validate(req.body)
    if (error) {
        res.status(400).json({
            error: true,
            message: error.details[0].message
        })
    }
    next()
}

const validationNewInfos = Joi.object({
    name: Joi.string().min(3),
    password: Joi.alternatives().try(
        Joi.string().min(4),
        Joi.number().integer().min(1000)
    )
})


export const validateNewInfos = (req, res, next) => {
    const {error} = validateNewInfos.validate(req.body)
    if (error) {
        res.status(400).json({
            error: true,
            message: error.details[0].message
        })
    }
    next()
}