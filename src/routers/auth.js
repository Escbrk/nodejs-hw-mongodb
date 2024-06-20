import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';
import { registerUserSchema } from '../validation/registerUserSchema.js';

export const authRouter = new Router();

authRouter.post(
  '/auth/register',
  validateBody(registerUserSchema),
  ctrlWrapper(),
);
authRouter.post('/auth/login', validateBody(), ctrlWrapper());
authRouter.post('/auth/refresh', ctrlWrapper());
authRouter.post('/auth/logout', ctrlWrapper());
