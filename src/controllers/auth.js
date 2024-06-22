import { createUser, loginUser } from '../services/auth.js';
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
