import { getConnection } from "../db/conexao.js";

export const addUser = async (name, password) => {
    const conexao = await getConnection()
    const [insert] = await conexao.execute(
        `insert into users (name, password)
        values (?,?)`,
        [name, password]
    )
    return {id: insert.insertId, name, password}
}

export const allUsers = async () => {
    const conexao = await getConnection()
    const [select] = await conexao.execute(
        `select * from users`
    )
    return select
}

export const getUserById = async (id) => {
    const conexao = await getConnection()
    const [select] = await conexao.execute(
        `select * from users
        where id = ?`,
        [id]
    )
    if (select.length === 0) {
        return false
    }
    return {name: select[0].name}
}