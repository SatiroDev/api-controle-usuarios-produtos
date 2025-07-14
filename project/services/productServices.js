import { getConnection } from '../db/connection.js'


export const createProduct = async (name, price, category, stock_quantity, available) => {
    const conexao = await getConnection()
    const [insert] = await conexao.execute(
        `insert into products (name, price, category, stock_quantity, available)
        values (?, ?, ?, ?, ?)`,
        [name, price, category, stock_quantity, available]
    )
    return {id: insert.insertId, name, price, category, stock_quantity, available}
}

// função que verifica se um produto existe pelo ID dele
export const getProductById = async (id) => {
    const conexao = await getConnection()
    const [consultationId] = await conexao.execute(
        `select * from products
        where id = ?`,
        [id]
    )
    if (consultationId.length === 0) {
        return false
    }    
    return id
}

// função para atualizar informações de um produto
export const updateValues = async (field, infos, id) => {
    const conexao = await getConnection()
    for (let i = 0; i < field.length; i++) {
        const [updateInformations] = await conexao.execute(
            ` update products set ${field[i]} = ?
            where id = ?`,
            [infos[i], id]
        )
    }
    return true
}

export const deleteProduct = async (id) => {
    const conexao = await getConnection()
    const [delProduct] = await conexao.execute(
        `delete from products
        where id = ?`,
        [id]
    )
    return true
}           