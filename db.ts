import { Dialect, Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USERNAME as string,
  process.env.DB_PASSWORD as string,
  {
    host: process.env.DB_HOST as string,
    dialect: process.env.DB_DIALECT as Dialect,
  }
);

export const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to database".bgGreen.white);
  } catch (error) {
    console.log(`DB Error - ${error}`.bgRed.white);
  }
};
