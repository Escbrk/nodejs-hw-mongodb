import { Router } from 'express';
import {
  createContactController,
  deleteContactByIdController,
  getContactByIdController,
  getContactsController,
  patchContactController,
  putContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';
import { updateContactsSchema } from '../validation/updateContactsSchema.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createContactsSchema } from '../validation/createContactsSchema.js';
import { valideteMongoId } from '../middlewares/validateMongoId.js';

export const contactsRouter = new Router();

contactsRouter.use('/contacts/:contactId', valideteMongoId('contactId'));

contactsRouter.get('/contacts', ctrlWrapper(getContactsController));

contactsRouter.get(
  '/contacts/:contactId',
  ctrlWrapper(getContactByIdController),
);

contactsRouter.post(
  '/contacts',
  validateBody(createContactsSchema),
  ctrlWrapper(createContactController),
);

contactsRouter.patch(
  '/contacts/:contactId',
  validateBody(updateContactsSchema),
  ctrlWrapper(patchContactController),
);

contactsRouter.put(
  '/contacts/:contactId',
  validateBody(createContactsSchema),
  ctrlWrapper(putContactController),
);

contactsRouter.delete(
  '/contacts/:contactId',
  ctrlWrapper(deleteContactByIdController),
);
