const ErrorResponse = require('../models/ErrorResponse.js');

const errorHandler = (err, req, res, next) => {
  // Log to console for the dev
  console.log(err.stack.red);

  res.status(500).json({
    success: false,
    errors: [err.message || 'Internal Server Error'],
  });
};

module.exports = errorHandler;
