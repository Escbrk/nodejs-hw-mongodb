import createHttpError from 'http-errors';

export const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, {
      abortEarly: false,
      convert: false,
    });
    next();
  } catch (error) {
    const errors = error.details.map((error) => error.message);

    next(
      createHttpError(400, 'Bad request', {
        errors,
      }),
    );
  }
};
