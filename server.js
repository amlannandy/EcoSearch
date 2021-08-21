const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const helmet = require('helmet');
const express = require('express');

// Load environment variables
dotenv.config();

const { connectToDatabase } = require('./db');
const { createTables } = require('./models/index');
const errorHandler = require('./middleware/errorHandler');

// Init database
connectToDatabase();

// Create db tables and relationships
createTables();

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

// const routes
const auth = require('./routes/auth');
const records = require('./routes/records');

// Assign routes
app.use('/api/v1/auth', auth);
app.use('/api/v1/records', records);

//Error handling middleware
app.use(errorHandler);

// Handle 404 cases
app.use('*', (req, res) => {
  return res.status(404).json({
    success: false,
    errors: ['This route does not exist'],
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(colors.bgYellow.black(`Listening on port ${PORT}`));
});
