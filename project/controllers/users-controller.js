import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { getConnection } from '../db/connection.js'
import { validationNamePassword } from '../validations/schemaUser.js'
import { secret_key } from '../secret_key/secretKey.js'


// função que procura um usuário pelo nome
export const searchUser = async (name) => {
    const conexao = await getConnection()
    const [search] = await conexao.execute(
        `select * from users
        where name = ?`,
        [name]
    ) 
    if (search.length === 0) {
        return false
    }
    return search
}

// função para cadastrar usuário
export const registerOfUser = async (req) => {
    try {
        const conexao = await getConnection()
        const {name, password, type} = req.body
        if (!await searchUser(name.toLowerCase())) {
            let passwordStr = password.toString()
            let typeRight = 'usuario'
            if (type && type.trim()) {
                typeRight = type.toLowerCase()
            }
            const validationnamepassword = await validationNamePassword({name, passwordStr})
            if (validationnamepassword){
                const passwordHash = await bcrypt.hash(password.toString(), 10) // criptografa a senha (10 vezes)
                const [insert] = await conexao.execute(
                    `insert into users (name, password, type)
                    values (?, ?, ?)`,
                    [name.toLowerCase(), passwordHash, typeRight]
                )
                console.log(`User "${name}" successfully registered!`)
                return true
            }
            return false
            }
        else {
            return false
        }
        
    } catch (error) {
        console.log('Error registering user ', error)
        return false
    }
} 

// função para o usuário fazer login
export const loginOfUser = async (req) => {
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
