import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { notFount } from './middlewares/notFound.js';
import { error } from './middlewares/error.js';
import { env } from './utils/env.js';
import { ENV_VARS } from './constants/constants.js';

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use('*', notFount);
  app.use(error);

  const PORT = Number(env(ENV_VARS.PORT, 3000));
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
    console.log(`Login time: ${new Date().toLocaleString()}`);
  });
};
