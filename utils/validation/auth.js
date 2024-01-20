const Joi = require("joi");

const signupValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
  });
  return schema.validate(data);
};

const emailValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
  });
  return schema.validate(data);
};

const resetPasswordValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
    otp: Joi.number().integer().min(1000).max(9999),
  });

  return schema.validate(data);
};

module.exports = {
  signupValidation,
  loginValidation,
  emailValidation,
  resetPasswordValidation,
};
