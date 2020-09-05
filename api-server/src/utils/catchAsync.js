/**
 * @description A HOF to wrap the request handler and catch unresolved promise
 * and pass it to global error handler
 * @param {fn} function Request handler function
 * @returns {fn} Request handler wrapper function
 */
module.exports = fn => (req, res, next) => {
  fn(req, res, next).catch(next);
};
