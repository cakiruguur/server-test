const CryptoJs = require("crypto-js");

const passwordToHash = (password) => {
  const pass_sha1 = CryptoJs.HmacSHA1(password, Config.APP.PASSWORD_SALT).toString();

  return CryptoJs.HmacSHA256(pass_sha1, Config.APP.PASSWORD_SALT).toString();
};

module.exports = {
  passwordToHash,
};
