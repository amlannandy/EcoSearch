const jwt = require('jsonwebtoken');

const User = require('../models/User');
const RevokedToken = require('../models/RevokedToken');

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
    const email = decoded.id;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        success: false,
        errors: ['You need to be authenticated to use this route'],
      });
    }

    // Check if token is revoked
    const revokedToken = await RevokedToken.findOne({ where: { token } });
    if (revokedToken) {
      return res.status(401).json({
        success: false,
        errors: ['Invalid token'],
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
