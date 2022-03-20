const JWT = require("jsonwebtoken");
const {APP} = Config

const generateAccessToken = (user) => {
    return JWT.sign({...user._doc}, APP.ACCESS_TOKEN_SECRET, {
        expiresIn: "1w",
      });
}

const generateRefreshToken = (user) => {
    return JWT.sign({...user._doc}, APP.REFRESH_TOKEN_SECRET)
}

module.exports = {
    generateAccessToken,
    generateRefreshToken
};
