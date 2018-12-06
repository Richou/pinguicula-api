const bcrypt = require('bcrypt')

const hashPassword = function (password, saltRounds) {
  return bcrypt.hash(password, saltRounds)
}

const comparePassword = function (hashed, plaintext) {
  return bcrypt.compare(plaintext, hashed)
}

module.exports.hashPassword = hashPassword
module.exports.comparePassword = comparePassword
