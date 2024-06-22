import bcrypt from 'bcrypt';
import { User } from '../db/models/user.js';
import createHttpError from 'http-errors';
import { Session } from '../db/models/session.js';

const createSession = () => {
  return {
    
  }
}

export const createUser = async (payload) => {
  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const user = await User.findOne({ email: payload.email });

  if (user) {
    throw createHttpError(409, 'Email in use');
  }

  return await User.create({ ...payload, password: hashedPassword });
};

export const loginUser = async ({ email, password }) => {
  const user = User.findOne({ email });

  if (!user) throw createHttpError(404, 'User not found!');

  const areEqual = await bcrypt.compare(password, user.password);
  if (!areEqual) throw createHttpError(401, 'Unautorized');

  await Session.deleteOne({ userId: user.id });

  return await Session.create({
    userId: user.id,
  });
};
