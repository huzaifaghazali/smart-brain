const knex = require('knex');

const postgresDB = knex({
   client: 'pg',
   connection: {
     host: process.env.DATABASE_HOST,
     port: process.env.DATABASE_PORT,
     user: process.env.DATABASE_USER,
     password: process.env.DATABASE_PASSWORD,
     database: 'smart-brain',
   },
 })


 module.exports = {
   postgresDB,
 }