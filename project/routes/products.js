import express from 'express'
import { productData, listProducts, registerProduct, deleteProductById } from '../controllers/products-controller.js'
import { validateToken } from '../middleware/auth-middleware.js'
import { onlyAdmin } from '../middleware/onlyAdmin.js'
import { validateProduct } from '../validations/schemaProduct.js'


const router = express.Router()

// caminho para listar as informações dos produtos que estão cadastrados, usuários e admins podem fazer isso!
router.get('/', validateToken, listProducts)

// caminho para cadastrar um produto, apenas admins podem fazer isso!
router.post('/', validateToken, onlyAdmin, validateProduct, registerProduct)

// caminho para editar alguma informção de algum produto, pelo ID, somente admins conseguem fazer isso!
router.put('/:id', validateToken, onlyAdmin, productData)

// caminho para deletar produto, apenas admins podem fazer isso!
router.delete('/:id', validateToken, onlyAdmin, deleteProductById)

export default router;