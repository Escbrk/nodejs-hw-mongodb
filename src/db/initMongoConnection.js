import mongoose from 'mongoose';
import { ENV_VARS } from '../constants/constants.js';
import { env } from '../utils/env.js';

export const initMongoConnection = async () => {
  const connectionLink = `mongodb+srv://${env(ENV_VARS.MONGODB_USER)}:${env(
    ENV_VARS.MONGODB_PASSWORD,
  )}@${env(ENV_VARS.MONGODB_URL)}/${env(
    ENV_VARS.MONGODB_DB,
  )}?retryWrites=true&w=majority&appName=Test`;

  try {
    await mongoose.connect(connectionLink);
    console.log('Mongo connection successfully established!');
  } catch (err) {
    console.log(err);
    throw err;
  }
};
