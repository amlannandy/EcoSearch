import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";

export const validateCreateRecord = [
  check("title").trim().not().isEmpty().withMessage("Please provide a title"),
  check("description")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Please provide a description"),
  check("imageUrl").trim().not().isEmpty().withMessage("Error uploading image"),
  check("latitude")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Please provide latitude")
    .isDecimal()
    .withMessage("Latitude must be decimal"),
  check("longitude")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Please provide longitude")
    .isDecimal()
    .withMessage("Longitude must be decimal"),
  (req: Request, res: Response, next: NextFunction) =>
    sendErrorResponse(req, res, next),
];

export const validateEditRecord = [
  check("title").trim().not().isEmpty().withMessage("Please provide a title"),
  check("description")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Please provide a description"),
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
