const { Sequelize } = require('sequelize');

const { sequelize } = require('../db');

const RevokedToken = sequelize.define('revoked_token', {
  token: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

RevokedToken.sync().then(() =>
  console.log('RevokedToken table created'.bgBlue.white)
);

module.exports = RevokedToken;
