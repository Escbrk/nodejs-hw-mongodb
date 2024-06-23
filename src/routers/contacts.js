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
import { authenticate } from '../middlewares/authenticate.js';
import { checkRoles } from '../middlewares/checkRoles.js';

const contactsRouter = Router();

contactsRouter.use('/:contactId', valideteMongoId('contactId'));
contactsRouter.use('/', authenticate);

contactsRouter.get('/', ctrlWrapper(getContactsController));

contactsRouter.get(
  '/:contactId',
  checkRoles('admin', 'user'),
  ctrlWrapper(getContactByIdController),
);

contactsRouter.post(
  '/',
  validateBody(createContactsSchema),
  ctrlWrapper(createContactController),
);

contactsRouter.patch(
  '/:contactId',
  checkRoles('admin', 'user'),
  validateBody(updateContactsSchema),
  ctrlWrapper(patchContactController),
);

contactsRouter.put(
  '/:contactId',
  checkRoles('admin', 'user'),
  validateBody(createContactsSchema),
  ctrlWrapper(putContactController),
);

contactsRouter.delete('/:contactId', ctrlWrapper(deleteContactByIdController));

export default contactsRouter;
