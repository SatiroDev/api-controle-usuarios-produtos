import Joi from "joi";

// frunção que faz uma validação de nome e senha (mínimo 4 caracteres)
export const validationNamePassword = async (req) => {
    const validation = Joi.object({
        name: Joi.string().min(4).required(), 
        passwordStr: Joi.string().min(4).required()
    })
    const { error } = validation.validate(req)
    if (error) {
        return  { error: error.details[0].message }
    }
    return req
}

