import bcrypt from 'bcrypt'

import { generateToken } from '../services/authService.js'
import { secret_key } from '../secret_key/secretKey.js'
import { searchUser, createUser } from '../services/userServices.js'

// função para cadastrar usuário
export const registerOfUser = async (req, res, next) => {
    try {
        const {name, password, type} = req.body

        const lowerCaseName = name.toLowerCase()

        if (await searchUser(lowerCaseName)) {
            const error = new Error('Duplicate username!')
            error.status = 400
            return next(error)
        }

        let typeRight = 'usuario'
        if (type && type.trim()) {
            typeRight = type.toLowerCase()
        }

        const passwordHash = await bcrypt.hash(password.toString(), 10) // criptografa a senha (10 vezes)
        const newUser = await createUser(lowerCaseName, passwordHash, typeRight)
        return res.status(201).json({
            message: `User '${lowerCaseName}' successfully registered!`,
            user: newUser
        })
        
    } catch (error) {
        const err = new Error('An unexpected error occurred during registration!')
        err.status = 500
        return next(err)
    }
} 

// função para o usuário fazer login
export const loginOfUser = async (req, res, next) => {
    try {
        const {name, password} = req.body  
        const user = await searchUser(name.toLowerCase())    
        if (user) {
            const passwordNoHash = await bcrypt.compare(password.toString(), user.password) // compara a password com a password criptografada
            if (passwordNoHash) {
                const token = await generateToken(secret_key, user)
                return res.status(201).json({
                    message: 'Authentication token created successfully!',
                    token
                })
            }
        }
        const error = new Error('Error logging in')
        error.status = 400
        return next(error)
    } catch (error) {
        const err = new Error('An unexpected error occurred during login!')
        err.status = 500
        return next(err)
    }
}
