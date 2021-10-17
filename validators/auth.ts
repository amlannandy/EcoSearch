import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";

export const validateRegister = [
  check("name").trim().not().isEmpty().withMessage("Please provide a name"),
  check("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Please provide an email")
    .isEmail()
    .withMessage("Email is invalid"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Please provide a password")
    .isLength({ min: 6 })
    .withMessage("Password must be atleast 6 characters long")
    .isAlphanumeric()
    .withMessage("Password must contain both alphabets and numbers"),
  (req: Request, res: Response, next: NextFunction) =>
    sendErrorResponse(req, res, next),
];

export const validateLogin = [
  check("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Please provide an email")
    .isEmail()
    .withMessage("Email is invalid"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Please provide a password"),
  (req: Request, res: Response, next: NextFunction) =>
    sendErrorResponse(req, res, next),
];

export const validateUpdatePassword = [
  check("currentPassword")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Please provide your current password"),
  check("newPassword")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Please provide a new password")
    .isLength({ min: 6 })
    .withMessage("Password must be atleast 6 characters long")
    .isAlphanumeric()
    .withMessage("Password must contain both alphabets and numbers"),
  (req: Request, res: Response, next: NextFunction) =>
    sendErrorResponse(req, res, next),
];

export const validateDeleteAccount = [
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Please provide your password"),
  (req: Request, res: Response, next: NextFunction) =>
    sendErrorResponse(req, res, next),
];

export const validateForgotPassword = [
  check("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Please provide an email")
    .isEmail()
    .withMessage("Email is invalid"),
  (req: Request, res: Response, next: NextFunction) =>
    sendErrorResponse(req, res, next),
];

export const validateResetPassword = [
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Please provide a new password")
    .isLength({ min: 6 })
    .withMessage("Password must be atleast 6 characters long")
    .isAlphanumeric()
    .withMessage("Password must contain both alphabets and numbers"),
  (req: Request, res: Response, next: NextFunction) =>
    sendErrorResponse(req, res, next),
];

export const validateUpdateInfo = [
  check("name").trim().not().isEmpty().withMessage("Please provide a name"),
  (req: Request, res: Response, next: NextFunction) =>
    sendErrorResponse(req, res, next),
];

const sendErrorResponse = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      errors: errors.array().map(err => err.msg),
    });
  }
  next();
};
