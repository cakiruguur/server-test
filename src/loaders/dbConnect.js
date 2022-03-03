const Mongoose = require("mongoose");
const db = Mongoose.connection;

const connectDB = async () => {
  await Mongoose.connect(
    `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
  );
};

db.once("open", () => {
  console.log("DB Bağlantısı başarılıdır.");
});

module.exports = {
  connectDB,
};
