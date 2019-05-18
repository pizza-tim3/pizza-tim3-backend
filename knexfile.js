module.exports = {
    development: {
        client: 'sqlite3',
        useNullAsDefault: true,
        connection: {
            filename: './data/pizza-time2.db3',
        },
        migrations: {
            directory: './data/migrations',
            tableName: 'knex_migrations',
        },
        seeds: {
            directory: './data/seeds',
        },
        production: {
            client: 'pg',
            useNullAsDefault: true,
            connection: process.env.DATABASE_URL,
            migrations: {
                directory: __dirname + '/data/migrations',
            },
            seeds: {
                directory: __dirname + '/data/seeds/',
            },
        },
    }
};
  