const express = require("express");
const helmet = require("helmet");
// Routes
const UserRoutes = require("@Routes/UserRoutes");
const CompanyRoutes = require("@Routes/CompanyRoutes");
//Error
const {errorHandler, notFound} = require("@Middleware/errorHandler")
//Middleware
const auth = require("@Middleware/auth");

module.exports = (app) => {
  // @INFO: Uygulamanın kullanacağı paketler
  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));


  // @INFO: Endpoints
  app.use("/user", UserRoutes);
  app.use("/companies",auth, CompanyRoutes);


  // @INFO: Yukardaki routeların hiçbirine denk gelmediyse hata verir
  app.use(notFound);

  // @INFO: Error Handling
  app.use(errorHandler);
};
