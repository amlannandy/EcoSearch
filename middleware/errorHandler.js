const errorHandler = (err, req, res, next) => {
  // Log to console for the dev
  console.log(err.stack.red);

  res.status(err.statusCode || 500).json({
    success: false,
    errors: [err.message || 'Internal Server Error'],
  });
};

module.exports = errorHandler;
