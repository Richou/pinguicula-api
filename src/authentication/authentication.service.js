const log4js = require('log4js')
const mongoose = require('mongoose')
const bcryptUtil = require('../common/bcrypt.util')
const User = mongoose.model('User')
const logger = log4js.getLogger('AuthenticationService')
const jwtUtil = require('../common/jwt.util')
logger.level = process.env.APPLICATION_LOG_LEVEL

const doLogin = async function (credentials) {
  const fromDb = await User.findOne({ email: credentials.email })
  if (fromDb !== null && fromDb !== undefined && await bcryptUtil.comparePassword(fromDb.password, credentials.password)) {
    return {
      uid: fromDb.uid,
      username: fromDb.username,
      email: fromDb.email
    }
  }
  throw new Error('BAD_CREDENTIALS')
}

const generateJwtForUser = function (user) {
  return jwtUtil.createToken(user.uid, user.email)
}

module.exports.doLogin = doLogin
module.exports.generateJwtForUser = generateJwtForUser
