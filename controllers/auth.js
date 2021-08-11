const User = require('../models/User');

exports.login = async (req, res) => {
  User.create({
    name: 'Amlan Kumar Nandy',
    username: 'amlannandy',
    email: 'amlannandy5@gmail.com',
    password: 'amlan123',
  });
  res.status(200).json({
    success: true,
    msg: 'Login route',
  });
};

exports.register = async (req, res) => {
  res.status(200).json({
    success: true,
    msg: 'Register route',
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
