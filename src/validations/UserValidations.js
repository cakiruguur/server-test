const Joi = require("joi");
const { tr } = require("./messages");

const createValidation = Joi.object({
  name: Joi.string().min(2).required().label("İsim").messages(tr),
  email: Joi.string().email().required().label('E-mail').messages(tr),
  password: Joi.string().min(8).required().label("Parola").messages(tr),
});

const loginValidation = Joi.object({
  email: Joi.string().email().required().label('E-mail').messages(tr),
  password: Joi.string().required().label("Parola").messages(tr),
});

const resetValidation = Joi.object({
  email: Joi.string().email().required().label("E-mail").messages(tr),
});

module.exports = {
  createValidation,
  loginValidation,
  resetValidation,
};
