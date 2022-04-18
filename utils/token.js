const crypto = require("crypto");

const generateCryptoToken = () => {
  return crypto.randomBytes(16).toString("hex");
};

module.exports = {
  generateCryptoToken,
};
