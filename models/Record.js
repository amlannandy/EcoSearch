const { Sequelize } = require('sequelize');

const User = require('./User');
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

Record.belongsTo(User);

Record.sync().then(() => console.log('Record table created'.bgBlue.white));

module.exports = Record;
