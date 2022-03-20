const express = require("express");
const Router = express.Router();
const UserController = require("@Controllers/UserController");
const validate = require("../app/Middleware/validate");
const auth = require("@Middleware/auth");
const { createValidation, loginValidation, resetValidation } = require("@/validations/UserValidations");
const wrap = require('../app/Middleware/promiseWrap');

Router.post("/profile-photo", auth, wrap(UserController.profilePhoto));

Router.post("/login", validate(loginValidation), UserController.login);
Router.post("/register", validate(createValidation), UserController.create);
Router.get("/whoami", auth, UserController.whoAmI);
Router.post("/reset-password", validate(resetValidation), UserController.resetPassword);

Router.get("/", UserController.index);
Router.get("/:id", auth, UserController.find);
Router.delete("/:id", auth, UserController.delete);

module.exports = Router;
