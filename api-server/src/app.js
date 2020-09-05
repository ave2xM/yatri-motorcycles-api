const express = require('express');
const path = require('path');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cors = require('cors');

const batteryRouter = require('./routes/batteryRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();
app.use(express.static('public'));

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
// Set Security HTTP headers
app.use(helmet());
app.use(cors());
app.use(express.json());
// Data sanitization against NOSQL query injection
app.use(mongoSanitize());
// Data sanitization against XSS
app.use(xss());

// ROUTES
app.use('/api/v1/batteries', batteryRouter);

/*
 * FOR DEMO ONLY!!!
 * Just for easier demo deployment
 */
app.use('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});
// Handling unhandled routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// GLOBAL ERROR HANDLING MIDDLEWARE
app.use(globalErrorHandler);

module.exports = app;
