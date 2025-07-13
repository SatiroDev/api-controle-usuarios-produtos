import jwt from 'jsonwebtoken'

// função que gera um token
export const generateToken = async (key, user) => {
    const token =  jwt.sign({id: user.id, name: user.name, type: user.type}, key, {expiresIn: '1h'})
    return token
}