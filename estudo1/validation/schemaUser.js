import Joi from 'joi'

const validation = Joi.object({
    name: Joi.string().min(3).required(),
    password: Joi.alternatives.try(
        Joi.string().min(4),
        Joi.number().integer().min(1000)
    ).required()
})

export const validateUser = (req, res, next) => {
    
}