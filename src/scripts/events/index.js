const send_email = require("./email");
const eventEmitter = require("./eventEmitter");

module.exports = () => {
  // @INFO: Sıfırlanan şifre mail gönderme işlemi
  send_email(eventEmitter);
};
