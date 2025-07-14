import jwt from 'jsonwebtoken'
import { secret_key, secret_refresh_key } from '../secret_key/secretKey.js'

// função que gera um token
export const generateToken = (user) => {
    const token =  jwt.sign({id: user.id, name: user.name, type: user.type}, secret_key, {expiresIn: '1h'})
    return token
}

// função que gera um refresh token
export const generateRefreshToken = (user) => {
    const refreshToken = jwt.sign({id: user.id, name: user.name, type: user.type}, secret_refresh_key, {expiresIn: '7d'})
    return refreshToken
}