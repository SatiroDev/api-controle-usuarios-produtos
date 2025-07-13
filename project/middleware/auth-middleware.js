import jwt from 'jsonwebtoken'
import { secret_key } from '../secret_key/secretKey.js' 

export const validateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader?.split(' ')[1]

        if (!token) {
            const error = new Error('Token not provided!')
            error.status = 400
            throw error
        }

        jwt.verify(token, secret_key, (err, user) => {
            if (err) {
                const error = new Error('Invalid or expired token!')
                error.status = 403
                throw error
            }
            req.user = user
            next()
        })
        
    } catch (error) {
        const err = new Error(error.message)
        err.status = error.status || 500
        return next(err)
    }
    
}

