import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export const valideteMongoId =
  (nameId = 'id') =>
  (req, res, next) => {
    const id = req.params[nameId];

    if (!id) throw new Error('ID is not provided');

    if (!isValidObjectId(id)) next(createHttpError(400, 'Invalid ID'));

    return next();
  };
