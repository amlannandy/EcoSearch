const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { DataTypes } = require('sequelize');

const { sequelize } = require('../db');

const User = sequelize.define(
  'user',
  {
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      defaultValue: process.env.AVATAR_IMAGE_URL,
    },
    createdAt: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
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
      beforeUpdate: async (user, options) => {
        if (user.changed().includes('password')) {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(user.password, salt);
          user.password = hashedPassword;
        }
      },
    },
    defaultScope: {
      attributes: { exclude: ['password'] },
    },
  }
);

User.prototype.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = User;
