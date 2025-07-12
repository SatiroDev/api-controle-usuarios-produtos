import express from 'express'
import { registerOfUser, loginOfUser } from '../controllers/users-controller.js'

const router = express.Router()


// caminho para o usuário se cadastrar
router.post('/register', async (req, res) => {
    const isUserRegistered = await registerOfUser(req)
    if (!isUserRegistered) {
        return res.status(400).json({
            status: 'Failure',
            message: 'Error registering user or user already exists!'
        })
    }
    return res.json({
        status: 'Success',
        message: `User '${req.body.name}' added successfully!`
    })
})

// caminho para o usuário fazer login
router.post('/login', async (req, res) => {
    const loginUser = await loginOfUser(req)
    if (!loginUser) {
        return res.status(401).json({
            status: 'Failure',
            message: 'Error logging in!'
        })
    }
    res.json(loginUser)
})

export default router;