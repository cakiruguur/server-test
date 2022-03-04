const express = require("express");
const Router = express.Router();
const ProjectController = require("@Controllers/ProjectController");
const validate = require("../app/Middleware/validate");
const auth = require("@Middleware/auth");
const { createValidation } = require("@/validations/ProjectValidations");

Router.get("/", ProjectController.index);
Router.post("/", auth, validate(createValidation), ProjectController.create);
Router.get("/:id", ProjectController.find);
Router.delete("/:id", ProjectController.delete);

module.exports = Router;
