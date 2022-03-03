const Joi = require('joi');

const createValidation = Joi.object({
    "name" : Joi.string().min(3).required()
})

module.exports = {
    createValidation
};
