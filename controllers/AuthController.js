const Joi = require("joi");
var response = require("../utils/response");
const User = require("../models/User");
const VerificationToken = require("../models/VerificationToken");
const { generatePassword, validatePassword } = require("../utils/password");
const { generateCryptoToken, signJwtToken } = require("../utils/token");
const Mailer = require("../utils/mailer");
const handlePromiseRequest = require("../utils/request");
const {
  signupValidation,
  loginValidation,
} = require("../utils/validation/auth");
const uploader = require("../utils/uploader");

const signup = async (req, res) => {
  const { body } = req;

  // validate
  const { error } = signupValidation(body);
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
  <div><a href="http://localhost:${process.env.PORT}/api/auth/email-confirmation/${confirmationToken}">Confirm email</a></div>
  `;
  const [, emailError] = await handlePromiseRequest(
    Mailer.SendLocalMail(body.email, "Account Confirmation", html)
  );
  if (emailError) {
    return response.error(
      res,
      "Error occured while sending an email to the user!"
    );
  }

  // save the user and token if email sending is successful
  var newUser = new User({
    email: body.email,
    name: body.name,
    birthdate: body.birthdate,
    address: body.address,
    phone: body.phone,
    password: await generatePassword(body.password),
  });

  var newToken = new VerificationToken({
    userId: newUser._id,
    token: confirmationToken,
  });

  await newUser.save();
  await newToken.save();

  return response.success(res, `Verification email is sent to ${body.email}`);
};

const confirmEmail = async (req, res) => {
  const { token } = req.params;

  // Find the matching verification token
  const tokenFound = await VerificationToken.findOne({ token });
  if (!tokenFound) {
    return response.error(
      res,
      "Unable to find a valid token. Your token my have expired!"
    );
  }

  // If token is found, find the matching user
  const user = await User.findOne({
    _id: tokenFound.userId,
  });
  if (!user)
    return response.error(res, "Unable to find a user for this token!");

  if (user.isVerified)
    return response.error(res, "This user has already been verified!");

  // Verify and save the user
  user.isVerified = true;
  user.save((err) => {
    if (err) return response.error(res, err.message);
    return response.success(
      res,
      "The account has been verified. Please log in!"
    );
  });
};

const login = async (req, res) => {
  const { error } = loginValidation(req.body);
  if (!!error) {
    return response.validationErrorWithData(res, "ValidationFailed", error);
  }

  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user)
    return response.invalidInput(res, "User with this email not found!");

  if (!user.isVerified)
    return response.unauthorized(res, "Your account has not been verified!");

  const isEqual = await validatePassword(password, user.password);
  if (!isEqual) return response.unauthorized(res, "Password is incorrect");

  const accessToken = signJwtToken({
    userId: user._id.toString(),
    email: user.email,
  });

  return response.successWithData(res, "Success", { token: accessToken });
};

const uploadTest = async (req, res) => {
  console.log(req);
  const result = await uploader(req);
  console.log(result);

  return response.success(res, "Success");
};

module.exports = {
  signup,
  confirmEmail,
  login,
  uploadTest,
};
