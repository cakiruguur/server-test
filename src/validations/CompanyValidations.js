const Joi = require("joi");
const { tr } = require("./messages");

const createValidation = Joi.object({
  name: Joi.string().min(3).label("Şirket Adı").required().messages(tr),
  logo: Joi.string(),
  address: Joi.string().label('Şirket adresi').required().messages(tr),
  phone: Joi.number().label('Şirket telefonu').required().messages(tr),
  email: Joi.string().email(),
  web: Joi.string(),
  sgk_no: Joi.string().min(24).label('SGK Sicil no').regex(/^[0-9]+$/).required().messages(tr),
  is_kolu: Joi.string(),
  isg_time: Joi.number(),
  hekim_time : Joi.number(),
  dsp_time: Joi.number(),
  official: Joi.string().label('Şirket yetkilisi').required().messages(tr),
  official_phone: Joi.number().label('Şirket yetkilisi telefonu').required().messages(tr),
});

module.exports = {
  createValidation,
};
