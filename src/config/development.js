module.exports = {
  // Application Configs
  APP: {
    PASSWORD_SALT: process.env.PASSWORD_SALT || "Password_Salt",
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || "Access_Token_Secret",
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || "Refresh_Token_Secret",
  },
  //Server Ayarları
  SERVER: {
    PORT: process.env.APP_PORT || 3000,
    HOST: process.env.APP_HOST || "localhost",
  },
  //Veritabanı Ayarları
  DB: {
    HOST: process.env.DB_HOST || "127.0.0.1",
    PORT: process.env.DB_PORT || 27017,
    NAME: process.env.DB_NAME || "server_test",
  },
  //Email Ayarları
  EMAIL: {
    HOST: process.env.EMAIL_HOST,
    PORT: process.env.EMAIL_PORT,
    USER: process.env.EMAIL_USER,
    PASS: process.env.EMAIL_PASS,
    FROM: process.env.EMAIL_FROM
  },
};
