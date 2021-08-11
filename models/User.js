const { Sequelize } = require('sequelize');

const { sequelize } = require('../db');

const User = sequelize.define('user', {
  name: {
    type: Sequelize.STRING,
  },
  username: {
    type: Sequelize.STRING,
    unique: true,
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
});

// Hash password before register
User.beforeCreate(async (user, options) => {
  const hashedPassword = user.password;
});

User.sync().then(() => console.log('User table created'.bgGreen.white));

module.exports = User;
