import { getConnection } from '../db/connection.js'

// função que procura um usuário pelo nome
export const searchUser = async (name) => {
    const conexao = await getConnection()
    const [search] = await conexao.execute(
        `select * from users
        where name = ?`,
        [name]
    ) 
    if (search.length === 0) {
        return false
    }
    return {id: search[0].id, name: search[0].name, password: search[0].password, type: search[0].type}
}

// função que cria um novo usuário
export const createUser = async (name, password, type) => {
    const conexao = await getConnection()
    const [insert] = await conexao.execute(
        `insert into users (name, password, type)
        values (?, ?, ?)`,
        [name, password, type]
    )
    console.log(insert)
    return {id: insert.insertId, name, password, type}
}
    