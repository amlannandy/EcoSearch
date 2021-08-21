const { DataTypes } = require('sequelize');

const { sequelize } = require('../db');

const Record = sequelize.define('record', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  label: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  latitude: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  longitude: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
});

module.exports = Record;
