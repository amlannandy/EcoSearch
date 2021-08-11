const jwt = require('jsonwebtoken');

const User = require('../models/User');

const authHandler = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      errors: ['You need to be authenticated to use this route'],
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: decoded });
    if (!user) {
      return res.status(401).json({
        success: false,
        errors: ['You need to be authenticated to use this route'],
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      errors: ['You need to be authenticated to use this route'],
    });
  }
};

module.exports = authHandler;
