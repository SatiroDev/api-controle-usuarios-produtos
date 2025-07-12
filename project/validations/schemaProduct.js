import Joi from "joi";

// função para validação das informações de um produto
export const validateProducts = async (req) => {
    const validation = Joi.object({
        name: Joi.string().min(1).required(),
        price: Joi.number().min(0).required(),
        category: Joi.string().min(1).required(),
        stock_quantity: Joi.number().integer().min(0).required()
    })

    const { error } = validation.validate(req)
    if (error) {
        return { error : error.details[0].message }
    }
    return req
}
