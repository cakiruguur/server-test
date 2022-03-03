const httpStatus = require("http-status");
const JWT = require("jsonwebtoken");
const auth = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1] || null;

  if (token == null) return res.status(httpStatus.UNAUTHORIZED).send({ message: "Giriş yapmanız gerekmektedir" });

  JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      res.send(err);
    }

    delete decoded.password
    req.user = decoded;
    next();
  });
};

module.exports = auth;
