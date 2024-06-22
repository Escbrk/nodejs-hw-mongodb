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

const contactsRouter = Router();

contactsRouter.use('/:contactId', valideteMongoId('contactId'));

contactsRouter.get('/', ctrlWrapper(getContactsController));

contactsRouter.get('/:contactId', ctrlWrapper(getContactByIdController));

contactsRouter.post(
  '/',
  validateBody(createContactsSchema),
  ctrlWrapper(createContactController),
);

contactsRouter.patch(
  '/:contactId',
  validateBody(updateContactsSchema),
  ctrlWrapper(patchContactController),
);

contactsRouter.put(
  '/:contactId',
  validateBody(createContactsSchema),
  ctrlWrapper(putContactController),
);

contactsRouter.delete('/:contactId', ctrlWrapper(deleteContactByIdController));

export default contactsRouter;
