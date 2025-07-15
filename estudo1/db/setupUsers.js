
import { getConnection } from "./conexao.js";

// export const addUser = async (name, password) => {
//     const conexao = getConnection()
//     const insert = await conexao.execute(
//         `insert into user(name, password)
//         values (?,?)`,
//         [name, password]
//     )
//     return insert
// }


export const createTableUser = async () => {
    const conexao = getConnection()
    await conexao.execute(
        `create table if not exists users (
            id int primary key auto_increment,
            name varchar(200) not null,
            password varchar(255) not null
        )`
    )
}