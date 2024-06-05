export const error = (err, req, res) => {
  res.status(500).json({
    status: 500,
    message: err.message,
  });
};
