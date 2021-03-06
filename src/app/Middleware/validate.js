const httpStatus = require("http-status");

const validate = (schema) => (req, res, next) => {
  const { value, error } = schema.validate(req.body);

  if (error) {
    const messages = error.details.map((detail) => detail.message);
    res.status(httpStatus.BAD_REQUEST).send(messages);
    return;
  }
  Object.assign(req, value);
  return next();
};

module.exports = validate;
