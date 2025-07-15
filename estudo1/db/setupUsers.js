
import { getConnection } from "./conexao.js";


export const createTableUser = async () => {
    const conexao = await getConnection()
    await conexao.execute(
        `create table if not exists users (
            id int primary key auto_increment,
            name varchar(200) not null,
            password varchar(255) not null
        )`)
}
