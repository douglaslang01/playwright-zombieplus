const { Pool } = require('pg');
require('dotenv').config();

const dbConfig = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
}

export async function executeSQL(sqlScript) {

    const pool = new Pool(dbConfig);
    const client = await pool.connect();
    try {
        await client.query(sqlScript);
    } catch (error) {
        console.log('Erro ao executar SQL ' + error);
    }
    finally {

        client.release();
        await pool.end();
    }
}