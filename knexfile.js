require('dotenv').config()

module.exports = {
    client: 'mysql2',
    connection: {
        database: process.env.DBNAME,
        user: process.env.DBUSER,
        password: process.env.DBPASS
    },
    pool: {
        min: 2,
        max: 10
    },
    migrations: {
        tablename: 'knex_migrations'
    }
}