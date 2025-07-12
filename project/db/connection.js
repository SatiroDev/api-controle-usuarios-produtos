import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config() 


// função que faz uma conexão com um banco de dados
export const getConnection = async () => {
    return await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    })
}
