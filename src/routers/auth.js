import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';
import { registerUserSchema } from '../validation/registerUserSchema.js';
import {
  loginUserController,
  registerUserController,
} from '../controllers/auth.js';
import { loginUserSchema } from '../validation/loginUserSchema.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);
authRouter.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);
// authRouter.post('/refresh', ctrlWrapper());
// authRouter.post('/logout', ctrlWrapper());

export default authRouter;
