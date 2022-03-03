const express = require('express');
const UserRoutes = require("@Routes/UserRoutes");
const ProjectRoutes = require("@Routes/ProjectRoutes");

module.exports = (app) => {
  // @INFO: Uygulamanın kullanacağı paketler
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  //@INFO: Endpoints
  app.use("/projects", ProjectRoutes);
  app.use("/user", UserRoutes);
};
