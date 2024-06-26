import path from 'node:path';

export const ENV_VARS = {
  PORT: 'PORT',
  MONGODB_USER: 'MONGODB_USER',
  MONGODB_PASSWORD: 'MONGODB_PASSWORD',
  MONGODB_URL: 'MONGODB_URL',
  MONGODB_DB: 'MONGODB_DB',

  SMTP_HOST: 'SMTP_HOST',
  SMTP_PORT: 'SMTP_PORT',
  SMTP_USER: 'SMTP_USER',
  SMTP_PASSWORD: 'SMTP_PASSWORD',
  SMTP_FROM: 'SMTP_FROM',

  JWT_SECRET: 'JWT_SECRET',

  DOMAIN: {
    APP_DOMAIN: 'APP_DOMAIN',
    BACKEND_DOMAIN: 'BACKEND_HOST',
  },

  CLAUDINARY: {
    CLOUD_NAME: 'CLOUD_NAME',
    API_KEY: 'API_KEY',
    API_SECRET: 'API_SECRET',
    IS_CLOUDINARY_ENABLED: 'IS_CLOUDINARY_ENABLED',
  },
};

export const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
};

export const TOKEN_PERIOD = {
  MINS_30: Date.now() + 1000 * 60 * 30, // 30 mins
  DAYS_30: Date.now() + 1000 * 60 * 60 * 24 * 30, // 30 days
};

export const DIRECTORIES = {
  TEMPLATES_DIR: path.join(process.cwd(), 'src', 'templates'),
};
