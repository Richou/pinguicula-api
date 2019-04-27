import bcrypt = require("bcrypt");

export const hashPassword = (password, saltRounds) => {
  return bcrypt.hash(password, saltRounds);
};

export const comparePassword = (hashed, plaintext) => {
  return bcrypt.compare(plaintext, hashed);
};
