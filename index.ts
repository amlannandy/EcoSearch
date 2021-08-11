import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import colors from 'colors';
import helmet from 'helmet';
import express from 'express';

import connectDatabase from './db';

// Import routes
import auth from './routes/auth';

// Load environment variables
dotenv.config();

// Init database
connectDatabase();

// Init app
const app = express();

// Middleware for enhancing security
app.use(helmet());

// Middleware for 3rd party access
app.use(cors());

// Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Assign routes
app.use('/api/v1/auth', auth);

// Handle 404 cases
app.use('*', (req, res) => {
  return res.status(404).json({
    success: false,
    errors: ['This route does not exist'],
  });
});

const PORT: number = parseInt(process.env.PORT as string, 10) || 5000;

app.listen(PORT, () => {
  console.log(colors.bgYellow.black(`Listening on port ${PORT}`));
});
