/**
 * @description Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
 * @param {fn} function Lorem Ipsum is not simply random text.
 * @return {fn}
 */
module.exports = fn => (req, res, next) => {
  fn(req, res, next).catch(next);
};
