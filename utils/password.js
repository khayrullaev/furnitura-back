const Bcrypt = require("bcrypt");

const generatePassword = async (password) => {
  return await Bcrypt.hash(password, 12);
};

const validatePassword = async (password, passwordToCompare) => {
  return await Bcrypt.compare(password, passwordToCompare);
};

module.exports = {
  generatePassword,
  validatePassword,
};
