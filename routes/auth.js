const { Router } = require('express');

const {
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
} = require('../controllers/auth');
const {
  validateLogin,
  validateRegister,
  validateUpdatePassword,
  validateDeleteAccount,
  validateForgotPassword,
  validateResetPassword,
  validateUpdateInfo,
} = require('../validators/auth');
const multerUploads = require('../middleware/multer');
const authHandler = require('../middleware/authHandler');

const router = Router();

router.post('/login', validateLogin, login);

router.post('/logout', logout);

router.post('/register', validateRegister, register);

router.get('/current-user', authHandler, getCurrentUser);

router.put(
  '/update-password',
  [authHandler, validateUpdatePassword],
  updatePassword
);

router.put(
  '/delete-account',
  [authHandler, validateDeleteAccount],
  deleteAccount
);

router.put('/forgot-password', validateForgotPassword, forgotPassword);

router.put('/reset-password/:token', validateResetPassword, resetPassword);

router.put('/upload-image', [authHandler, multerUploads], uploadProfileImage);

router.put('/update-info', [authHandler, validateUpdateInfo], updateInfo);

module.exports = router;
