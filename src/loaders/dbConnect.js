const Mongoose = require("mongoose");
const db = Mongoose.connection;

const connectDB = async () => {
  await Mongoose.connect(`mongodb://${Config.DB.HOST}:${Config.DB.PORT}/${Config.DB.NAME}`);
};

db.once("open", () => {
  console.log("DB Bağlantısı başarılıdır.");
});

module.exports = connectDB
