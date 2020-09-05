import { Request, Response, NextFunction } from 'express';

/**
 * @description A HOF to wrap the request handler and catch unresolved promise
 * and pass it to global error handler
 * @param {function} function Request handler function
 * @returns {function} Request handler wrapper function
 */

export default (fn: Function) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  fn(req, res, next).catch(next);
};
