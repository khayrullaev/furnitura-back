const Joi = require("joi");

const signupValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
    birthdate: Joi.string(),
    address: Joi.string(),
    phone: Joi.string().required(),
  });
  return schema.validate(data);
};

module.exports = {
  signupValidation,
};
