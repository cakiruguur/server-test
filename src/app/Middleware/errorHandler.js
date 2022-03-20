const ApiError = require('../Errors/apiErrors');

exports.notFound = (req, res, next) => {
  next(ApiError.notFound());
};

exports.errorHandler = (err, req, res, next) => {
  res.status(err.status || 500).json({
    error: {
      message: err.message || "Aradığınız sayfa bulunamadı...",
      status: err.status || 500,
      path: req.path,
    },
  });
};
