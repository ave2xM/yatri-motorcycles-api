import AppError from '../utils/appError';
import { Request, Response, NextFunction } from 'express';

const handleCastErrorDB = (err: AppError) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err: AppError) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const sendErrForDev = (err: AppError, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const sendErrProduction = (err: AppError, res: Response) => {
  // Operational, trusted error, error produced by our code
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    // Programming error or other unknown error
  } else {
    console.error('ERROR 💥', err);
    // Send generic message
    res.status(500).json({
      status: 'Internal server error',
    });
  }
};

// GLOBAL ERROR HANDLING MIDDLEWARE
export default (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrForDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    // Marking errors as operational - Transforming generic error to operational
    let error = { ...err };
    error.message = err.message;

    if (error.kind === 'ObjectId' && error.path && error.value)
      error = handleCastErrorDB(error);
    if (err.name === 'ValidationError') error = handleValidationErrorDB(error);

    sendErrProduction(error, res);
  }
};
