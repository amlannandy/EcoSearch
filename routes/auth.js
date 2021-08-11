const { Router } = require('express');

const {
  login,
  logout,
  register,
  getCurrentUser,
} = require('../controllers/auth');
const { validateLogin, validateRegister } = require('../validators/auth');

const router = Router();

router.post('/login', validateLogin, login);

router.post('/logout', logout);

router.post('/register', validateRegister, register);

router.get('/current-user', getCurrentUser);

module.exports = router;
