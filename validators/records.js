const { check, validationResult } = require('express-validator');

exports.validateCreateRecord = [
  check('title').trim().not().isEmpty().withMessage('Please provide a title'),
  check('description')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please provide a description'),
  check('latitude')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please provide latitude')
    .isDecimal()
    .withMessage('Latitude must be decimal'),
  check('longitude')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please provide longitude')
    .isDecimal()
    .withMessage('Longitude must be decimal'),
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
