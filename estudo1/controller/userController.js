// Criar usuário (POST /users)

// Listar todos (GET /users)

// Buscar por ID (GET /users/:id)

// Atualizar usuário (PUT /users/:id)

// Deletar usuário (DELETE /users/:id)

import { addUser, allUsers, getUserById } from "../services/userServices.js"


export const createUser = async (req, res) => {
    try {
        const {name, password} = req.body
        const userAdd = await addUser(name, password)
        if (!userAdd) {
            return res.status(400).json({
                error: true,
                message: 'Erro ao adicionar usuário, verifica os dados!'
            })
        }
        return res.status(201).json({
            error: false,
            message: `Usuário '${name}' adicionado com sucessso!`
        })
    }

    catch (error) {
        console.log(error)
        return res.status(500).json({
            error: true,
            message: error.message
        })
    }    
}


export const selectAllUsers = async (req, res) => {
    try {
        const users = await allUsers()
        if (users.length === 0) {
            return res.status(400).json({
                error: true,
                message: '0 users added'
            })
        }
        return res.json({
            error: false,
            "added users": users
        })
    } catch (error) {
        return res.status(400).json({
            error: true,
            message: error.message
        })
    }
}

export const selectUserById = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const user = await getUserById(id)
        if (!user) {
            return res.status(400).json({
                error: true,
                message: `User with ID '${id}' not found`
            })
        }
        return res.json({
            error: false,
            message: `User with ID '${id}': '${user.name}'`
        })
    } catch (error) {
        return res.status(400).json({
            error: true,
            message: error.message
        })
    }
}


export const updateUser = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const {name, password} = req.body

        const campos = []
        const infos = []
        if (name && name.trim() !== '') {
            campos.push('name')
            infos.push(name)
        } 
        if (infos) {
            campos.push('password')
            infos.push(password)
        }
        
    } catch (error) {
        
    }
}