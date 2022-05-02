const formidable = require("formidable");
const path = require("path");
const fs = require("fs");

// models
const User = require("../models/User");
const VerificationToken = require("../models/VerificationToken");

// utils
var response = require("../utils/response");
const { uploader } = require("../utils/uploader");
const Mailer = require("../utils/mailer");
const handlePromiseRequest = require("../utils/request");
const { generatePassword, validatePassword } = require("../utils/password");
const { generateCryptoToken, signJwtToken } = require("../utils/token");
const {
  signupValidation,
  loginValidation,
} = require("../utils/validation/auth");

const signup = async (req, res) => {
  const uploadDirectory = path.join(__dirname, "../Uploads");
  const form = new formidable.IncomingForm();
  form.uploadDir = uploadDirectory;
  form.keepExtensions = true;
  form.multiples = true;

  form.parse(req, async (err, fields, files) => {
    // validate
    const { error } = signupValidation(fields);
    if (!!error) {
      return response.validationErrorWithData(res, "ValidationFailed", error);
    }

    // check for existing user
    const existingUser = await User.findOne({ email: fields.email });
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
      Mailer.SendLocalMail(fields.email, "Account Confirmation", html)
    );
    if (emailError) {
      return response.error(
        res,
        "Error occured while sending an email to the user!"
      );
    }

    // // save the user and token if email sending is successful
    const profileImg = await uploader(files["profileImg"]);
    var newUser = new User({
      email: fields.email,
      name: fields.name,
      birthdate: fields.birthdate,
      address: fields.address,
      phone: fields.phone,
      password: await generatePassword(fields.password),
      profileImg: profileImg || {
        url: "",
        publicId: "",
      },
    });

    var newToken = new VerificationToken({
      userId: newUser._id,
      token: confirmationToken,
    });

    await newUser.save();
    await newToken.save();

    fs.unlink(files["profileImg"].filepath, (err) => {
      if (err)
        console.error(
          "Error occured while trying to remove/unlink a file from disk: ",
          err
        );
      console.log(`${files["profileImg"].filepath} has been deleted.`);
    });

    return response.success(
      res,
      `Verification email is sent to ${fields.email}`
    );
  });
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
    return response.error(
      res,
      "This user has already been verified! Please log in!"
    );

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
  // validate
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

module.exports = {
  signup,
  confirmEmail,
  login,
};
