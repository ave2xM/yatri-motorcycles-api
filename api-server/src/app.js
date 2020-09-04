const express = require('express');
const path = require('path');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cors = require('cors');

const batteryRouter = require('./routes/batteryRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();
app.use(express.static('public'));

/*
 * Allow 100 requests from the same ip in 1 hour
 * if the threshold exceeds send an error with the message
 */
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour',
});
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
// Set Security HTTP headers
app.use(helmet());
app.use(cors());
// Apply the limiter only to route starting with /api
// app.use('/api', limiter);
// Body parser, reading data from the body into req.body | max 15kb
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
  // Whenever we pass an argument to next, it'll assume that it's an error
  // It'll skip all the middlewares and send the the error to the GLOBAL ERROR HANDLING MIDDLEWARE
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// GLOBAL ERROR HANDLING MIDDLEWARE
app.use(globalErrorHandler);

module.exports = app;
