const { Client } = require('pg');

const connectionString = 'postgres://cpuxitba:Wep8XzmzXOHtYGOGh7tCH7n6Vh9R7nwq@hattie.db.elephantsql.com:5432/cpuxitba'

const client = new Client({connectionString});

client.connect((err)=>{
    if(err) {
        console.log('Error on connect to PostgreSQL');
    } else {
        console.log('Connected to PostgreSQL');
    }
})

module.exports = client;