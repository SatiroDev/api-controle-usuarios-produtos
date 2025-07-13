import { getConnection } from '../db/connection.js'
import { createProduct, updateValues, getProductById, deleteProduct } from '../services/productServices.js'
import { logger } from '../utils/logger.js'

// frunção para listar todos os produtos que estejam cadastrados
export const listProducts = async (req, res, next) => {
    try {
        const conexao = await getConnection()
        const [selectTableProducts] = await conexao.execute(
            `select * from products`
        )
        logger.info('Products registered in the database')
        return res.json({
            'Registered products': selectTableProducts
        })
    } catch (error) {
        logger.error(error.message)
        const err = new Error(error.message)
        err.status = 500
        return next(err)
    }
    
}


// função para cadastrar um produto
export const registerProduct = async (req, res, next) => {
    try {
        const {name, price, category, stock_quantity} = req.body
        let available = "true"
        if (stock_quantity === 0) available = "false"
        const newProduct = await createProduct(name, price, category, stock_quantity, available)
        logger.info(`Product '${name}' registered!`)
        return res.status(201).json({
            message: `Product '${name}' successfully registered!`,
            product: newProduct
        })
    } catch (error) {
        logger.error(error.message)
        const err = new Error(error.message)
        err.status = 500
        return next(err)
    }
   

} 


// função para deletar um produto pelo id
export const deleteProductById = async (req, res, next) => {
    try {
        const id =  parseInt(req.params.id)
        const getProductId = await getProductById(id)
        if (!getProductId) {
            const error = new Error(`Product with ID '${id}' not found!`)
            error.status = 404
            logger.error(error.message)
            throw error
        }
        await deleteProduct(id)
        logger.info(`Product with ID '${id}' deleted successfully!`)
        return res.json({
            error: false,
            message: 'Product deleted successfully!'
        })
    } catch (error) {
        logger.error(error.message)
        const err = new Error(error.message)
        err.status = error.status || 500
        return next(err)
    }
}

export const productData = async (req, res, next) => {
    try {
        // chamada para verificar se o ID existe, e se existir retorna o id
        const productId = await getProductById(req)
        if (!productId) {
            const error = new Error(`Product with ID '${productId}' not found!`)
            error.status = 404
            logger.error(error.message)
            throw error
        }
        
        const {name, price, category, stock_quantity} = req.body
        let field = []
        let values = []

        let available = "false"

        if (name && name.trim() !== '') {
            values.push(name.trim())
            field.push("name")
        }
        if (price && price >= 0) {
            values.push(price)
            field.push("price")
        }
        if (category && category.trim() !== '') {
            values.push(category.trim())
            field.push("category")
        }
        if (typeof stock_quantity === 'number' && stock_quantity >= 0) {
            values.push(stock_quantity)
            field.push("stock_quantity")

            if (stock_quantity > 0) {
                available = "true"
            }

            values.push(available)
            field.push("available")
        }
        if (!field.length || field.length !== values.length) {
            const error = new Error("Fields and values provided for update are invalid!")
            error.status = 400
            logger.error(error.message)
            throw error
            
        }
        await updateValues(field, values, productId)
        logger.info(`product information with id '${productId}' updated!`)
        return res.json({
            error: false,
            message: `Product values with the ID '${productId}' updated successfully!`, 
        })
    } catch (error) {
        logger.error(error.message)
        const err = new Error(error.message)
        err.status = error.status || 500
        return next(err)
    }
}
