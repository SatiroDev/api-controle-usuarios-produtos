import jwt from 'jsonwebtoken'
import { secret_key } from '../secret_key/secretKey.js' 

export const validateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader?.split(' ')[1]

        if (!token) {
            return res.status(401).json({
                status: 'Failure',
                message: 'Token not provided!'
            })
        }

        jwt.verify(token, secret_key, (err, user) => {
            if (err) {
                return res.status(403).json({
                    status: 'Failure',
                    message: 'Invalid or expired token!'
                })
            }

            req.user = user

            next()
        })
        
    } catch (error) {
        return res.status(401).json({
            status: 'Failure',
            message: 'Token not provided or incorrectly formatted!'
        })
    }
    
}

