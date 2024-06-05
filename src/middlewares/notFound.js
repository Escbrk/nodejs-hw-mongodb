export const notFount = (req, res) => {
  res.status(404).json({
    status: 404,
    message: 'Ooops! Page not found!',
  });
};
