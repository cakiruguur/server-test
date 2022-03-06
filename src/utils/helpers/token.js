const JWT = require("jsonwebtoken");

const generateAccessToken = (user) => {
    return JWT.sign({...user._doc}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1w",
      });
}

const generateRefreshToken = (user) => {
    return JWT.sign({...user._doc}, process.env.REFRESH_TOKEN_SECRET)
}

module.exports = {
    generateAccessToken,
    generateRefreshToken
};
