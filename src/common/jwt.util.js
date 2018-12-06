const fs = require('fs')
const jwt = require('jsonwebtoken')

const privateKey = fs.readFileSync(process.env.PRIVATE_KEY_FILE)
const publicKey = fs.readFileSync(process.env.PUBLIC_KEY_FILE)

const createToken = function (uid, email) {
  return jwt.sign({
    uid: uid, email: email
  }, privateKey, {
    algorithm: 'RS512'
  })
}

const getPublicKey = function () {
  return publicKey
}

module.exports.createToken = createToken
module.exports.getPublicKey = getPublicKey
