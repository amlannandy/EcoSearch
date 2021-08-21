const { check, validationResult } = require('express-validator');

exports.validateRegister = [
  check('name').trim().not().isEmpty().withMessage('Please provide a name'),
  check('email')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please provide an email')
    .isEmail()
    .withMessage('Email is invalid'),
  check('password')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please provide a password')
    .isLength({ min: 6 })
    .withMessage('Password must be atleast 6 characters long')
    .isAlphanumeric()
    .withMessage('Password must contain both alphabets and numbers'),
  (req, res, next) => sendErrorResponse(req, res, next),
];

exports.validateLogin = [
  check('email')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please provide an email')
    .isEmail()
    .withMessage('Email is invalid'),
  check('password')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please provide a password'),
  (req, res, next) => sendErrorResponse(req, res, next),
];

exports.validateUpdatePassword = [
  check('currentPassword')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please provide your current password'),
  check('newPassword')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please provide a new password')
    .isLength({ min: 6 })
    .withMessage('Password must be atleast 6 characters long')
    .isAlphanumeric()
    .withMessage('Password must contain both alphabets and numbers'),
  (req, res, next) => sendErrorResponse(req, res, next),
];

exports.validateDeleteAccount = [
  check('password')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please provide your password'),
  (req, res, next) => sendErrorResponse(req, res, next),
];

exports.validateForgotPassword = [
  check('email')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please provide an email')
    .isEmail()
    .withMessage('Email is invalid'),
  (req, res, next) => sendErrorResponse(req, res, next),
];

exports.validateResetPassword = [
  check('password')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please provide a password'),
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
