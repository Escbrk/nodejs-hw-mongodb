import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';
import { registerUserSchema } from '../validation/registerUserSchema.js';
import {
  loginUserController,
  logoutController,
  refreshTokenController,
  registerUserController,
  resetPwdController,
  sendResetEmailController,
} from '../controllers/auth.js';
import { loginUserSchema } from '../validation/loginUserSchema.js';
import { requestResetPasswordSchema } from '../validation/requestResetPasswordSchema.js';
import { resetPwdSchema } from '../validation/resetPwdSchema.js';

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

authRouter.post(
  '/send-reset-email',
  validateBody(requestResetPasswordSchema),
  ctrlWrapper(sendResetEmailController),
);

authRouter.post(
  '/reset-pwd',
  validateBody(resetPwdSchema),
  ctrlWrapper(resetPwdController),
);

authRouter.post('/refresh', ctrlWrapper(refreshTokenController));
authRouter.post('/logout', ctrlWrapper(logoutController));

export default authRouter;
