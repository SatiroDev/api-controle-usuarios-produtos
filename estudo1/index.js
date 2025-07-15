//  Novo Exercício Prático: API de Usuários com Banco de Dados (SQLite + Prisma)
// 📁 Funcionalidades mínimas:
// Criar usuário (POST /users)

// Listar todos (GET /users)

// Buscar por ID (GET /users/:id)

// Atualizar usuário (PUT /users/:id)

import express from "express";
import router from "./routes/user.js";
import { createTableUser } from "./db/setupUsers.js";

const PORT = 3000

const app = express()

app.use(express.json())


app.use('/', router)

app.listen(PORT, async () => {
    await createTableUser()
    console.log('Servidor rodando na porta 3000')
})