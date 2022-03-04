const Joi = require('joi');
const {tr} = require('./messages');

const createValidation = Joi.object({
    "name" : Joi.string().min(3).label("Proje Adı").required().messages(tr)
})

module.exports = {
    createValidation
};
