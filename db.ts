import { Sequelize } from 'sequelize';

const connectDatabase = async () => {
  const databaseName = process.env.DB_NAME as string;
  const username = process.env.DB_USERNAME as string;
  const password = process.env.DB_PASSWORD as string;
  const dbHost = process.env.DB_HOST as string;
  const sequelize = new Sequelize(databaseName, username, password, {
    host: dbHost,
    dialect: 'postgres',
  });
  try {
    await sequelize.authenticate();
    console.log('Connected to database'.bgGreen.white);
  } catch (error) {
    console.log(`Error connecting to database - ${error}`.bgRed.white);
  }
};

export default connectDatabase;
