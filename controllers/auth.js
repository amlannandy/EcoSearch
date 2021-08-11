const User = require('../models/User');

// @description   Login user
// @route         POST /api/v1/auth/login
// @access        Public
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(404).json({
      success: false,
      errors: ['Account with this email does not exist'],
    });
  }
  const authResult = await user.matchPassword(password);
  if (!authResult) {
    return res.status(401).json({
      success: false,
      errors: ['Incorrect Password'],
    });
  }
  const token = user.authToken;
  res.status(200).json({
    success: true,
    data: token,
  });
};

// @description   Register user
// @route         POST /api/v1/auth/register
// @access        Public
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    return res.status(409).json({
      success: false,
      errors: ['Account with this email already exists'],
    });
  }
  const user = await User.create({ name, email, password });
  const token = user.authToken;
  res.status(200).json({
    success: true,
    data: token,
  });
};

// @description   Get logged in user
// @route         POST /api/v1/auth/current-user
// @access        Private
exports.getCurrentUser = async (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    data: user,
  });
};

exports.logout = async (req, res) => {
  res.status(200).json({
    success: true,
    msg: 'Logout route',
  });
};
