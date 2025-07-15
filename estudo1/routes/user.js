import express from 'express'
import { validateUser } from "../validation/schmUser.js"
import { createUser, selectAllUsers, selectUserById } from '../controller/userController.js'


const router = express.Router()

router.post('/users', validateUser, createUser)

router.get('/users', selectAllUsers)

router.get('/users/:id', selectUserById)

router.put('/users/:id')

// router.delete('/users:/id')

export default router

// Deletar usuário (DELETE /users/:id)
// Criar usuário (POST /users)

// Listar todos (GET /users)

// Buscar por ID (GET /users/:id)

// Atualizar usuário (PUT /users/:id)