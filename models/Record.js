const { Sequelize } = require('sequelize');

const { sequelize } = require('../db');

const Record = sequelize.define('record', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

module.exports = Record;
