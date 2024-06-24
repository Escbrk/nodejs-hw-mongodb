export const ENV_VARS = {
  PORT: 'PORT',
  MONGODB_USER: 'MONGODB_USER',
  MONGODB_PASSWORD: 'MONGODB_PASSWORD',
  MONGODB_URL: 'MONGODB_URL',
  MONGODB_DB: 'MONGODB_DB',
};

export const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
};

export const TOKEN_PERIOD = {
  MINS_15: Date.now() + 1000 * 60 * 15, // 15 mins
  DAYS_30: Date.now() + 1000 * 60 * 60 * 24 * 30, // 30 days
};
