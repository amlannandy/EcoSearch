const { Sequelize } = require('sequelize');

const { sequelize } = require('../db');

const RevokedToken = sequelize.define('revoked_token', {
  token: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = RevokedToken;
