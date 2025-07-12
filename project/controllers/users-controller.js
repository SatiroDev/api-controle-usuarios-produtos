import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { secret_key } from '../secret_key/secretKey.js'
import { searchUser, createUser } from '../services/userServices.js'




// função para cadastrar usuário
export const registerOfUser = async (req, res, next) => {
    try {
        const conexao = await getConnection()
        const {name, password, type} = req.body

        const lowerCaseName = name.toLowerCase()

        if (await searchUser(lowerCaseName)) {
            return res.status(400).json({message: 'Duplicate username!'})
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
        next(error)
    }
} 

// função para o usuário fazer login
export const loginOfUser = async (req, res, next) => {
    try {
        const {name, password} = req.body  
        let passwordStr = password.toString()  
        const userSearch = await searchUser(name)    
        if (userSearch) {
            const passwordNoHash = await bcrypt.compare(passwordStr, userSearch[0].password) // compara a password com a password criptografada
            if (passwordNoHash) {
                return await generateToken(secret_key, userSearch, userSearch[0].type)
            }
        }
        
        
        return false
    } catch (error) {
        console.log('Error logging in ', error)
        return false
    }
}

// função que gera um token
export const generateToken = async (chave, user, type) => {
    const token =  jwt.sign({id: user[0].id, name: user[0].name, type: type}, chave, {expiresIn: '1h'})
    return {token}
}
