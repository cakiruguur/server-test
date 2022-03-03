const { connectDB } = require("../loaders/dbConnect");

module.exports = () => {
  // Tanıtılan alias bilgilerini çalıştırmak için
  require("module-alias/register");

  // Veritabanı bağlantısı
  connectDB();
};
