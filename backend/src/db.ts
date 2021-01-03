import { Client } from 'pg';

// @ts-ignore
const { DB_HOST, DB_NAME, DB_PORT, DB_USER, DB_PASSWORD } = process.env;
const config = {
    host: DB_HOST || 'dumbo.db.elephantsql.com',
    database: DB_NAME || 'vmbwjzpi',
    port: Number(DB_PORT) || 5432,
    user: DB_USER || 'vmbwjzpi',
    password: DB_PASSWORD || '8KZQA1H1eZHyut-L7KpVRFRXLKNEikwh',
};

const client = new Client(config);

client.connect((err: Error)=>{
    if(err) {
        console.error('Connection error to PostgreSQL ', err.stack);
    } else {
        console.log('Connected to PostgreSQL');
    }
});

export { client as db };
