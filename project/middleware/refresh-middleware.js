import jwt from 'jsonwebtoken'
import { secret_refresh_key } from '../secret_key/secretKey.js' 
import { generateToken } from '../services/authService.js'
import { logger } from '../utils/logger.js'

export const validateRefreshToken = async (req, res, next) => {
    try {
        const { refreshToken } = req.body
        if (!refreshToken) {
            const error = new Error('Refresh token not provided!')
            error.status = 401
            throw error
        }

        jwt.verify(refreshToken, secret_refresh_key, (err, user) => {
            if (err) {
                const error = new Error('Invalid or expired refresh token!')
                error.status = 403
                throw error
            }
            const newToken = generateToken(user)
            console.log(newToken)
            logger.info('New authentication token acess created successfully!')
            return res.status(201).json({
                error: false,
                message: 'New authentication token created successfully!',
                newToken
            })
        })
    } catch (error) {
        
    }
}