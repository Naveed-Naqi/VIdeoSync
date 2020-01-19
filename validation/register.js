var validator = require("validator");
const isEmpty = require("is-empty");

const validateRegisterInput = data => {
  let { email, username, password, confirmPassword } = data;
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  email = !isEmpty(email) ? email : "";
  username = !isEmpty(username) ? username : "";
  password = !isEmpty(password) ? password : "";
  confirmPassword = !isEmpty(confirmPassword) ? confirmPassword : "";

  // Email checks
  if (email === "") {
    errors.email = "Email field is required";
  } else if (!validator.isEmail(email)) {
    errors.email = "Email field must be valid";
  }

  // Email checks
  if (username === "") {
    errors.registerUsername = "Username field is required";
  }

  // Password checks
  if (password === "") {
    errors.registerPassword = "Password field is required";
  }
  if (confirmPassword === "") {
    errors.confirmPassword = "Confirm password field is required";
  }
  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.registerPassword = "Password must be at least 6 characters";
  }
  if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords must match";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateRegisterInput;
