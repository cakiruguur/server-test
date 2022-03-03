require("./src/config")();
require('./src/loaders')();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const routes = require('@Routes/');
const helmet = require("helmet");

app.use(helmet())

// @INFO: Uygulama çalışıyor
app.listen(PORT, () => {
  console.log(`Server ${PORT} portu üzerinden çalışıyor...`);
  routes(app)
});