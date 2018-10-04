export default {
  appName: 'App',
  version: process.env.VERSION || 'unknown',
  api: {
    port: 2667
  },
  logging: {
    errorFile: 'logs/error.log',
    logFile: 'logs/combined.log'
  },
  database: {
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
  },
  authentication: {
    enabled: true,
    secret: process.env.AUTH_SECRET || 'I9A6n8OF5NVwoSgQBZTY79pQ4gCOh20u',
  },
  defaultUsers: [
    {
      type: 'ADMIN',
      firstName: process.env.DEFAULT_ADMIN_USER_FIRST_NAME || 'Admin',
      lastName: process.env.DEFAULT_ADMIN_USER_LAST_NAME || 'User',
      email: process.env.DEFAULT_ADMIN_USER_EMAIL || 'admin@example.com',
      password: process.env.DEFAULT_ADMIN_USER_PASSWORD || 'password'
    }
  ]
};
