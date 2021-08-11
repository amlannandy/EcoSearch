const User = require('../models/User');

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

exports.getCurrentUser = async (req, res) => {
  res.status(200).json({
    success: true,
    msg: 'Get current user route',
  });
};

exports.logout = async (req, res) => {
  res.status(200).json({
    success: true,
    msg: 'Logout route',
  });
};
