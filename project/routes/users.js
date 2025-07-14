import express from 'express'
import { registerOfUser, loginOfUser } from '../controllers/users-controller.js'
import { validateUser } from '../validations/schemaUser.js'
import { validateRefreshToken } from '../middleware/refresh-middleware.js'


const router = express.Router()

// caminho para o usuário se cadastrar
router.post('/register', validateUser, registerOfUser)

// caminho para o usuário fazer login
router.post('/login', loginOfUser)

router.post('/refresh', validateRefreshToken)

export default router;