const { check, validationResult } = require('express-validator');

exports.validateCreateRecord = [
  check('title').trim().not().isEmpty().withMessage('Please provide a title'),
  check('description')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please provide a description'),
  (req, res, next) => sendErrorResponse(req, res, next),
];

const sendErrorResponse = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      errors: errors.array().map(err => err.msg),
    });
  }
  next();
};
