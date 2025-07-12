import { getConnection } from './connection.js'

// cria a tabela 'usuarios' caso ela não exista ainda
export const setupBankUsers = async () => {
    const conexao = await getConnection()
    await conexao.execute(`
        create table if not exists users(
            id int primary key auto_increment,
            name varchar(200) not null unique,
            password varchar(255) not null,
            type varchar(100) default "usuarios"
        )`)
}

// cria a tabela 'produtos' caso ela não exista ainda
export const setupBankProducts = async () => {
    const conexao = await getConnection()
    await conexao.execute(`
        create table if not exists products (
            id int primary key auto_increment,
            name varchar(150) not null,
            price decimal(10,2) not null,
            category varchar(100),
            stock_quantity int not null,
            available varchar(5)
        )`)
}