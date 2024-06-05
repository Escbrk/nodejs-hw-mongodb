import dotenv from 'dotenv';

dotenv.config();

export const env = (envPort, defaultPort) => {
  if (process.env[envPort]) return process.env[envPort];
  if (defaultPort) return defaultPort;

  throw new Error(`env var with name: ${envPort} not found`);
};
