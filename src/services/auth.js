import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { User } from '../db/models/user.js';
import createHttpError from 'http-errors';
import { Session } from '../db/models/session.js';
import { TOKEN_PERIOD } from '../constants/constants.js';

const createSession = () => {
  return {
    accessToken: crypto.randomBytes(40).toString('base64'),
    refreshToken: crypto.randomBytes(40).toString('base64'),
    accessTokenValidUntil: TOKEN_PERIOD.MINS_30,
    refreshTokenValidUntil: TOKEN_PERIOD.DAYS_30,
  };
};

export const createUser = async (payload) => {
  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const user = await User.findOne({ email: payload.email });

  if (user) {
    throw createHttpError(409, 'Email in use');
  }

  return await User.create({ ...payload, password: hashedPassword });
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw createHttpError(404, 'User not found!');

  const isEqual = await bcrypt.compare(password, user.password);
  if (!isEqual) throw createHttpError(401, 'Unautorized');

  await Session.deleteOne({ userId: user.id });

  return await Session.create({
    userId: user.id,
    ...createSession(),
  });
};

export const refreshSession = async ({ res, sessionId, sessionToken }) => {
  const session = await Session.findOne({
    _id: sessionId,
    refreshToken: sessionToken,
  });
  if (!session) throw createHttpError(401, 'Session not found');

  if (Date.now() > session.refreshTokenValidUntil) {
    res.clearCookie('sessionId');
    res.clearCookie('sessionToken');

    throw createHttpError(401, 'Refresh token is expired');
  }

  const user = await User.findById(session.userId);
  if (!user) throw createHttpError(401, 'Session not found');

  await Session.deleteOne({ _id: sessionId });

  return await Session.create({
    userId: user.id,
    ...createSession(),
  });
};

export const logoutUser = async ({ sessionId, sessionToken }) => {
  return await Session.deleteOne({
    _id: sessionId,
    refreshToken: sessionToken,
  });
};

export const sendResetEmail = async ({ email }) => {
  await User.findOne({ email });
};
