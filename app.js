require("./src/loaders")(); // Loaders - DB Connect işlemleri vb.
const { SERVER, fileUploadOptions } = Config;

const express = require("express");
const app = express();
const routes = require("@Routes/");
const fileUpload = require("express-fileupload");

app.use(fileUpload(fileUploadOptions));
app.use("/uploads", express.static("src/uploads"));

// @INFO: Uygulama çalışıyor
app.listen(SERVER.PORT, () => {
  console.log(`Server ${SERVER.PORT} portu üzerinden çalışıyor...`);
  console.log(`> Local : ${require("chalk").blue(`http://${SERVER.HOST}:${SERVER.PORT}`)}`);
  routes(app);
});
