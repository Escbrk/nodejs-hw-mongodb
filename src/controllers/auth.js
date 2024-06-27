import {
  createUser,
  loginUser,
  logoutUser,
  refreshSession,
  resetPwd,
  sendResetEmail,
} from '../services/auth.js';
import { setupSessionCookies } from '../utils/setupSessionCookies.js';

export const registerUserController = async (req, res) => {
  const user = await createUser(req.body);

  res.json({
    status: 201,
    message: 'Successfully registered a user!',
    data: { user },
  });
};

export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);

  setupSessionCookies(res, session);

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: { accessToken: session.accessToken },
  });
};

export const refreshTokenController = async (req, res) => {
  const { sessionId, sessionToken } = req.cookies;
  const session = await refreshSession({ res, sessionId, sessionToken });

  setupSessionCookies(res, session);

  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: { accessToken: session.accessToken },
  });
};

export const logoutController = async (req, res) => {
  await logoutUser({
    sessionId: req.cookies.sessionId,
    sessionToken: req.cookies.sessionToken,
  });

  res.clearCookie('sessionId');
  res.clearCookie('sessionToken');

  res.status(204).send();
};

export const sendResetEmailController = async (req, res) => {
  const { email } = req.body;

  await sendResetEmail(email);

  res.json({
    status: 200,
    message: 'Reset password email has been successfully sent.',
    data: {},
  });
};

export const resetPwdController = async (req, res) => {
  await resetPwd(req.body);

  return {
    status: 200,
    message: 'Password has been successfully reset.',
    data: {},
  };
};
