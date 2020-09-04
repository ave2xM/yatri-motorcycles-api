class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    // setting a flag so that we can know the error is created using this class
    this.isOperational = true;

    // A non-standard V8 function that creates the stack property on an Error instance.
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
