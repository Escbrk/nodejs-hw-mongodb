import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { notFount } from './middlewares/notFound.js';
import { error } from './middlewares/error.js';
import { env } from './utils/env.js';
import { ENV_VARS } from './constants/constants.js';
import { getAllContacts, getContactById } from './services/contacts.js';
import { isValidObjectId } from 'mongoose';

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

  app.get('/contacts', async (req, res) => {
    try {
      const contacts = await getAllContacts();
      if (!contacts) {
        return res.status(404).json({
          status: 404,
          message: 'Not Found!',
        });
      }

      return res.json({
        status: 200,
        message: 'Successfully found contacts!',
      });
    } catch (err) {
      console.log(err);
    }
  });
  app.get('/contacts/:contactId', async (req, res) => {
    const contactId = req.params.contactId;

    if (isValidObjectId(id)) {
      try {
        const contact = await getContactById(contactId);

        if (!contact) {
          return res.status(404).json({
            status: 404,
            message: `Contact with ID: '${contactId}' not found`,
          });
        }

        return res.json({
          status: 200,
          message: `Successfully found contact with id ${contactId}!`
        });
      } catch (err) {
        console.log(err);
      }
    }
  });

  app.use('*', notFount);
  app.use(error);

  const PORT = Number(env(ENV_VARS.PORT, 3000));
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
    console.log(`Login time: ${new Date().toLocaleString()}`);
  });
};
