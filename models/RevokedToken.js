const { DataTypes } = require('sequelize');

const { sequelize } = require('../db');

const RevokedToken = sequelize.define('revoked_token', {
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = RevokedToken;
