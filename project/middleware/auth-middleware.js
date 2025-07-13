import jwt from 'jsonwebtoken'
import { secret_key } from '../secret_key/secretKey.js' 

export const validateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader?.split(' ')[1]

        if (!token) {
            const error = new Error('Token not provided!')
            error.status = 400
            return next(error)
        }

        jwt.verify(token, secret_key, (err, user) => {
            if (err) {
                const error = new Error('Invalid or expired token!')
                error.status = 403
                return next(error)
            }
            req.user = user
            next()
        })
        
    } catch (error) {
        const err = new Error('Token not provided or incorrectly formatted!')
        err.status = 500
        return next(err)
    }
    
}

