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
    url: process.env.DATABASE_URL || 'mongodb://localhost/app'
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
