const { Router } = require('express');

const {
  login,
  logout,
  register,
  getCurrentUser,
} = require('../controllers/auth');
const { validateRegister } = require('../validators/auth');

const router = Router();

router.post('/login', login);

router.post('/logout', logout);

router.post('/register', validateRegister, register);

router.get('/current-user', getCurrentUser);

module.exports = router;
