const express = require("express");
const Router = express.Router();
const CompanyController = require("@Controllers/CompanyController");
const validate = require("../app/Middleware/validate");
const { createValidation } = require("@/validations/CompanyValidations");

Router.route("/").get(CompanyController.index).post(validate(createValidation), CompanyController.create);

Router.route("/:id").get(CompanyController.find).patch( CompanyController.update).delete(CompanyController.delete);
module.exports = Router;
