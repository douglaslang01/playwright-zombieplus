const { Pool } = require('pg');

const dbConfig = {
    user: 'postgres',
    host: 'localhost',
    database: 'zombieplus',
    password: 'pwd123',
    port: 5432
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