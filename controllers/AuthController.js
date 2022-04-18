const Joi = require("joi");
var response = require("../utils/response");
const User = require("../models/User");
const { generatePassword, validatePassword } = require("../utils/password");
const { generateCryptoToken } = require("../utils/token");
const Mailer = require("../utils/mailer");

const signup = async (req, res, next) => {
  const { body } = req;
  const validationSchema = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
    birthdate: Joi.string(),
    address: Joi.string(),
    phone: Joi.string().required(),
  });

  // validate
  const { value, error } = validationSchema.validate(body);
  if (!!error) {
    return response.validationErrorWithData(res, "ValidationFailed", error);
  }

  // check for existing user
  const existingUser = await User.findOne({ email: body.email });
  if (existingUser) {
    return response.invalidInput(res, "User already exists");
  }

  // create token and send email
  const confirmationToken = generateCryptoToken();
  const html = `
  <div>Please verify your account by clicking the link below</div>
  <div><a href="https://localhost:${process.env.PORT}/api/auth/email-confirmation/${confirmationToken}">Confirm email</a></div>
  `;
  const emailResult = await Mailer.SendLocalMail(
    body.email,
    "Account Confirmation",
    html
  );

  const hashedPw = generatePassword(body.password);
  return response.successWithData(res, "Success", value);
};

const login = (req, res, next) => {
  try {
    console.log("request to /login");
    return res.status(200).send({ code: 200, message: "nice man" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  signup,
};
