import express from 'express'

const router = express.Router()

router.post('/users')

router.get('/users')

router.get('/users/:id')

router.put('/users/:id')

router.delete('/users:/id')

// Deletar usuário (DELETE /users/:id)
// Criar usuário (POST /users)

// Listar todos (GET /users)

// Buscar por ID (GET /users/:id)

// Atualizar usuário (PUT /users/:id)