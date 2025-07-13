import Joi from "joi";
import { logger } from "../utils/logger.js";
// função que faz uma validação das informações obrigatórias do produto

const validation = Joi.object({
    name: Joi.string().min(1).required(), 
    price: Joi.alternatives().try(
        Joi.string().min(1),
        Joi.number().min(0)
    ).required(),
    stock_quantity: Joi.number().integer().min(0),
    category: Joi.string().min(1).required()
})

export const validateProduct = (req, res, next) => {
    const { error } = validation.validate(req.body)
    if (error) {
        logger.error(error.details[0].message)
        const err = new Error(error.details[0].message);
        err.status = 400
        return next(err)
    }
    next()
}

