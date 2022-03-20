const configs = require(`./${process.env.NODE_ENV || "development"}`);

const others = {
  fileUploadOptions: {
    createParentPath: true,
    limits: { fileSize: 10 * 1024 * 1024 },
    limitHandler: (req, res, next) => {
      next(new Error("Dosya büyük"));
    },
  },
};

module.exports = Object.assign(configs, others);
