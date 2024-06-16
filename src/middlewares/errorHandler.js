import { isHttpError } from 'http-errors';
import { MongooseError } from 'mongoose';

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.status;

  if (isHttpError(err)) {
    return res.status(statusCode).json({
      status: statusCode,
      message: err.message,
      error: err.errors || [],
    });
  }

  if (err instanceof MongooseError) {
    return res.status(500).json({
      status: 500,
      message: 'Mongoose Error',
      data: {
        message: err.message,
      },
    });
  }

  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    data: {
      message: err.message,
    },
  });
};
