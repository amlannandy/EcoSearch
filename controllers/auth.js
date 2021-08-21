const User = require('../models/User');
const { sendPasswordResetmail } = require('../utils/sendMail');
const asyncHandler = require('../middleware/asyncHandler');

// @description   Login user
// @route         POST /api/v1/auth/login
// @access        Public
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    where: { email },
    attributes: { include: 'password' },
  });
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
});

// @description   Register user
// @route         POST /api/v1/auth/register
// @access        Public
exports.register = asyncHandler(async (req, res) => {
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
});

// @description   Get logged in user
// @route         POST /api/v1/auth/current-user
// @access        Private
exports.getCurrentUser = asyncHandler(async (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    data: user,
  });
});

exports.logout = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    msg: 'Logout route',
  });
});

// @description   Update password
// @route         PUT /api/v1/auth/update-password
// @access        Private
exports.updatePassword = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { currentPassword, newPassword } = req.body;
  const user = await User.findOne({
    where: { id: userId },
    attributes: { include: 'password' },
  });

  const authResult = await user.matchPassword(currentPassword);
  if (!authResult) {
    return res.status(401).json({
      success: false,
      errors: ['Incorrect Password'],
    });
  }

  await user.update({ password: newPassword });
  res.status(200).json({
    success: true,
    msg: 'Password updated',
  });
});

// @description   Delete Account
// @route         PUT /api/v1/auth/delete-account
// @access        Private
exports.deleteAccount = asyncHandler(async (req, res) => {
  const id = req.user.id;
  const password = req.body.password;
  const user = await User.findOne({
    where: { id },
    attributes: { include: 'password' },
  });

  const authResult = await user.matchPassword(password);
  if (!authResult) {
    return res.status(401).json({
      success: false,
      errors: ['Incorrect Password'],
    });
  }

  await user.destroy();
  res.status(200).json({
    success: true,
    msg: 'Account deleted',
  });
});

// @description   Forgot password
// @route         PUT /api/v1/auth/forgot-password
// @access        Private
exports.forgotPassword = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(404).json({
      success: false,
      errors: ['Account with this email does not exist'],
    });
  }

  const token = user.authToken;
  await sendPasswordResetmail(email, token);
  res.status(200).json({
    success: true,
    msg: 'Reset mail sent. Please check your emails',
  });
});
