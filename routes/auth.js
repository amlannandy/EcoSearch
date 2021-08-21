const { Router } = require('express');

const {
  login,
  logout,
  register,
  getCurrentUser,
  updatePassword,
  deleteAccount,
  forgotPassword,
} = require('../controllers/auth');
const {
  validateLogin,
  validateRegister,
  validateUpdatePassword,
  validateDeleteAccount,
  validateForgotPassword,
} = require('../validators/auth');
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

router.put('/forgot-password', [validateForgotPassword], forgotPassword);

module.exports = router;
