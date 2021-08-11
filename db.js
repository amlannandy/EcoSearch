const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  }
);

exports.sequelize = sequelize;

exports.connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to database'.bgGreen.white);
  } catch (error) {
    console.log(`DB Error - ${error}`.bgRed.white);
  }
};
