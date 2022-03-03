const CryptoJs = require("crypto-js");

const passwordToHash = (password) => {
  const pass_sha1 = CryptoJs.HmacSHA1(
    password,
    process.env.PASSWORD_SALT
  ).toString();

  return CryptoJs.HmacSHA256(pass_sha1, process.env.PASSWORD_SALT).toString();
};

module.exports = {
  passwordToHash,
};