const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Sequelize } = require('sequelize');

const { sequelize } = require('../db');

const User = sequelize.define(
  'user',
  {
    name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: Sequelize.STRING,
      validate: {
        isAlphanumeric: true,
      },
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    createdAt: {
      type: Sequelize.DATEONLY,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    getterMethods: {
      authToken() {
        return jwt.sign({ id: this.email }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRE,
        });
      },
    },
    hooks: {
      beforeCreate: async (user, options) => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
      },
    },
  }
);

User.sync().then(() => console.log('User table created'.bgBlue.white));

module.exports = User;
