import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';
import { registerUserSchema } from '../validation/registerUserSchema.js';
import { registerUserController } from '../controllers/auth.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);
// authRouter.post('/login', validateBody(), ctrlWrapper());
// authRouter.post('/refresh', ctrlWrapper());
// authRouter.post('/logout', ctrlWrapper());

export default authRouter;
