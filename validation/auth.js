const validator = require('validator');

const registerValidator = (data) => {
  const errors = {};

  console.log(validator.isEmpty(data.email));

  // PASSWORD
  if (!validator.isAlphanumeric(data.password, 'en-US')) {
    errors.password = 'Only Latin letters and numbers';
  }
  if (!validator.isLength(data.password, { min: 6, max: 36 })) {
    errors.password = 'Password must be between 6 and 36 characters';
  }
  if (validator.isEmpty(data.password)) {
    errors.password = 'Password filed is required';
  }

  // PASSWORD 2
  if (!validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords must match';
  }
  if (validator.isEmpty(data.password2)) {
    errors.password2 = 'Confirm password filed is required';
  }

  // LOGIN
  if (!validator.isAlphanumeric(data.login, 'en-US')) {
    errors.login = 'Only Latin letters and numbers';
  }
  if (!validator.isLength(data.login, { min: 3, max: 16 })) {
    errors.login = 'Login must be between 3 and 16 characters';
  }
  if (validator.isEmpty(data.login)) {
    errors.login = 'Login filed is required';
  }

  // EMAIL
  if (!validator.isEmail(data.email)) {
    errors.email = 'Invalid email format';
  }
  if (validator.isEmpty(data.email)) {
    errors.email = 'Email filed is required';
  }
  return {
    errors,
    isOk: isEmptyObject(errors)
  };
};

const isEmptyObject = value =>
  value === undefined ||
  value === null ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0);

module.exports = {
  registerValidator
};
