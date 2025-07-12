import { getConnection } from '../db/connection.js'
import { validateProducts } from '../validations/schemaProduct.js'


// frunção para listar todos os produtos que estejam cadastrados
export const listProducts = async () => {
    const conexao = await getConnection()
    const [selectTableProducts] = await conexao.execute(
        `select * from products`
    )
    return selectTableProducts
}

// função para cadastrar um produto
export const registerProduct = async (req) => {
    try {
        const conexao = await getConnection()
        const product = await validateProducts(req.body)
        let available = "true"
        if (product.stock_quantity === 0) available = "false"
        if (product){

            const [insert] = await conexao.execute(
                `insert into products (name, price, category, stock_quantity, available)
                values (?, ?, ?, ?, ?)`,
                [product.name.toLowerCase(), product.price, product.category.toLowerCase(), product.stock_quantity, available]
            )
            console.log(`Product "${product.name}" successfully registered!`)
            return true
        }
        return false
    } catch (error) {
        console.log('Error registering product ', error)
        return false
    }
} 

// função para atualizar informações de um produto
export const updateProduct = async (field, infos, id) => {
    try {
        const conexao = await getConnection()
        let quantityVerification = 0
        for (let i = 0; i < field.length; i++) {
            const [updateInformations] = await conexao.execute(
                ` update products set ${field[i]} = ?
                where id = ?`,
                [infos[i], id]
            )
            if (updateInformations) {
                quantityVerification += 1
            }
        }
        if (quantityVerification !== infos.length || field.length === 0) {
            return false
        }
        return true
        
    } catch (error) {
        console.log('Error updating product ', error)
        return false
    }
}

// função para deletar um produto pelo id
export const deleteProduct = async (id) => {
    try {
        const conexao = await getConnection()
        const [delProduct] = await conexao.execute(
            `delete from products
            where id = ?`,
            [id]
        )
        return true
    } catch (error) {
        console.log('Error deleting product ' + error)
        return false
    }
}

// função que verifica se um produto existe pelo ID dele
export const getProductById = async (id) => {
    const conexao = await getConnection()
    const [consultationId] = await conexao.execute(
        `select * from products
        where id = ?`,
        [id]
    )
    return consultationId
}