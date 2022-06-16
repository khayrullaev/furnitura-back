const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const SECRET = process.env.TOKEN_SECRET;

const generateCryptoToken = () => {
  return crypto.randomBytes(16).toString("hex");
};

const signJwtToken = (info) => {
  return jwt.sign(info, SECRET, {
    algorithm: "HS256",
    expiresIn: "7 days",
  });
};

const validateJWT = (token) => {
  return jwt.verify(token, process.env.TOKEN_SECRET);
};

module.exports = {
  generateCryptoToken,
  signJwtToken,
  validateJWT,
};
