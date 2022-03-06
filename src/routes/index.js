const express = require("express");
const helmet = require("helmet");
// Routes
const UserRoutes = require("@Routes/UserRoutes");
const ProjectRoutes = require("@Routes/ProjectRoutes");
const apiError = require("../app/Errors/apiErrors");

module.exports = (app) => {
  // @INFO: Uygulamanın kullanacağı paketler
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(helmet());

  // @INFO: Endpoints
  app.use("/projects", ProjectRoutes);
  app.use("/user", UserRoutes);

  // @INFO: Yukardaki routeların hiçbirine denk gelmediyse hata verir
  app.use("/:not", (req, res, next) => {
    next(apiError.notFound());
  });

  // @INFO: Anasayfa
  app.use("/", (req, res) => {
    res.send({ message: "anasayfa" });
  });

  // @INFO: Error Handling
  app.use(require("@Middleware/errorHandler"));
};
