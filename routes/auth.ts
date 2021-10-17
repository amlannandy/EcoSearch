import { Router } from "express";

import {
  login,
  logout,
  register,
  getCurrentUser,
  updatePassword,
  deleteAccount,
  forgotPassword,
  resetPassword,
  uploadProfileImage,
  updateInfo,
} from "../controllers/auth";
import {
  validateLogin,
  validateRegister,
  validateUpdatePassword,
  validateDeleteAccount,
  validateForgotPassword,
  validateResetPassword,
  validateUpdateInfo,
} from "../validators/auth";
import multerUploads from "../middleware/multer";
import authHandler from "../middleware/authHandler";

const router = Router();

router.post("/login", validateLogin, login);

router.post("/logout", logout);

router.post("/register", validateRegister, register);

router.get("/current-user", authHandler, getCurrentUser);

router.put(
  "/update-password",
  [authHandler, validateUpdatePassword as any],
  updatePassword
);

router.put(
  "/delete-account",
  [authHandler, validateDeleteAccount as any],
  deleteAccount
);

router.put("/forgot-password", validateForgotPassword, forgotPassword);

router.put("/reset-password/:token", validateResetPassword, resetPassword);

router.put("/upload-image", [authHandler, multerUploads], uploadProfileImage);

router.put(
  "/update-info",
  [authHandler, validateUpdateInfo as any],
  updateInfo
);

export default router;
