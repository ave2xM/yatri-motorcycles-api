import express, { Application, Request, Response, NextFunction } from 'express';

import path from 'path';
import morgan from 'morgan';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
// import xss from 'xss-clean';
import cors from 'cors';
import batteryRouter from './routes/batteryRoutes';
import globalErrorHandler from './controllers/errorController';
const AppError = require('./utils/appError');

const app: Application = express();
app.use(express.static('public'));

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
// Set Security HTTP headers
app.use(helmet());
app.use(cors());
app.use(express.json());
// Data sanitization against NOSQL query injection
app.use(mongoSanitize());
// Data sanitization against XSS
// app.use(xss());

// ROUTES
app.use('/api/v1/batteries', batteryRouter);

/*
 * FOR DEMO ONLY!!!
 * Just for easier demo deployment
 */
app.use('/', (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});
// Handling unhandled routes
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// GLOBAL ERROR HANDLING MIDDLEWARE
app.use(globalErrorHandler);

export default app;
