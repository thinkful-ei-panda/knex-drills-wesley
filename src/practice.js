require('dotenv').config();
const knex = require ('knex');

const db = knex({
    client: 'pg',
    connection: process.env.DB_URL,
});

const searchTerm = 'holo';

db
    .from('amazong_products')
    .select('product_id','name','price','category','image')
    .whereNotNull('image')
    .then(result => {
        console.log(result);
    });
