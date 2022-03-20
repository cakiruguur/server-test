const connectDB = require("../loaders/dbConnect");

module.exports = () => {
  //env Configs
  require("dotenv").config();

  //NODE_ENV
  process.env.NODE_ENV = process.env.APP_ENV.toLowerCase() || "development";

  //Global Configuration Define
  global.Config = require("../config");

  // Tanıtılan alias bilgilerini çalıştırmak için
  require("module-alias/register");

  // Events - EventEmitter vb.
  require("../scripts/events")();

  // Veritabanı bağlantısı
  connectDB();
};
