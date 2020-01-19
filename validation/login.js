const validator = require("validator");
const isEmpty = require("is-empty");

const validateLoginInput = data => {
  let { username, password } = data;

  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  username = !isEmpty(username) ? username : "";
  password = !isEmpty(password) ? password : "";

  // Username checks
  if (validator.isEmpty(username)) {
    errors.username = "Username field is required";
  }

  //Password checks
  if (validator.isEmpty(password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateLoginInput;
