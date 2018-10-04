module.exports = {
    client: 'mysql',
    connection: {
        port: process.env.DATABASE_PORT || 3306,
        host: process.env.DATABASE_HOST || 'localhost',
        database: process.env.DATABASE_NAME || 'test',
        user: process.env.DATABASE_USER || 'test',
        password: process.env.DATABASE_ACCESS_KEY || 'test',
        timezone: 'UTC',
        dateStrings: true
    },
    pool: {
      min: process.env.DATABASE_POOL_MIN,
      max: process.env.DATABASE_POOL_MAX
    },
    migrations: {
      directory: './db/migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
};
