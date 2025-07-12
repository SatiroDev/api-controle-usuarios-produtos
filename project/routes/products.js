import express from 'express'
import { updateProduct, listProducts, registerProduct, deleteProduct, getProductById } from '../controllers/products-controller.js'
import { validateToken } from '../middleware/auth-middleware.js'
import { onlyAdmin } from '../middleware/onlyAdmin.js'

const router = express.Router()

// caminho para listar as informações dos produtos que estão cadastrados, usuários e admins podem fazer isso!
router.get('/', validateToken, async (req, res) => {
    const products = await listProducts()
    res.json(products)
})

// caminho para cadastrar um produto, apenas admins podem fazer isso!
router.post('/', validateToken, onlyAdmin,  async (req, res, next) => {
    try {
        await registerProduct(req)
        res.status(201).json({message: `Product '${req.body.name}' added successfully!`})
    } catch (error) {
        next(error)
    }
})

// caminho para editar alguma informção de algum produto, pelo ID, somente admins conseguem fazer isso!
router.put('/:id', validateToken, onlyAdmin,  async (req, res) => {
    try {
        const id =  parseInt(req.params.id)
        const getProductId = await getProductById(id)
        if (!getProductId) {
            return res.status(404).json({
                status: 'Failure',
                message: `Product with ID '${id}' not found!`
            })
        }
        const {name, price, category,  stock_quantity} = req.body
        let field = []
        let information = []
        let available = "false"
        if (name && name.trim() !== '') {
            information.push(name)
            field.push("name")
        }
        if (price && price >= 0) {
            information.push(price)
            field.push("price")
        }
        if (category && category.trim() !== '') {
            information.push(category)
            field.push("category")
        }
        if (stock_quantity >= 0) {
            information.push(stock_quantity)
            field.push("stock_quantity")
            if (stock_quantity > 0) {
                available = "true"
            }
            information.push(available)
            field.push("available")
        }
        const upProduct = await updateProduct(field, information, id)
        if (!upProduct) {
            return res.status(400).json({
                status: 'Failure',
                message: 'Error updating product information!'
            })
        }
            
        return res.json({
            status: 'Success',
            message: `Product information updated successfully!`
        })
        
    } catch (error) {
        return res.status(400).json({
            status: 'Failure',
            message: 'Check the path and the data filled in the fields.'
        })
    }
    
})

// caminho para deletar produto, apenas admins podem fazer isso!
router.delete('/:id', validateToken, onlyAdmin, async (req, res) => {
    const id =  parseInt(req.params.id)
    const getProductId = await getProductById(id)
    if (!getProductId) {
        return res.status(404).json({
            status: 'Failure',
            message: `Product with ID '${id}' not found!`
        })
    }

    const del = await deleteProduct(id)
    if (!del) {
        return res.status(400).json({
            status: 'Failure',
            message: `Error deleting product!`
        })
    }
    return res.json({
        status: 'Sucess',
        message: 'Product deleted successfully!'
    })
})

export default router;