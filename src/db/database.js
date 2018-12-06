const mongoose = require('mongoose')
const mongoUrl = process.env.DATABASE_URL || 'mongodb://localhost:27017/pinguicula'

const options = {
  useNewUrlParser: true,
  poolSize: 10
}

const mongoConnection = function () {
  return mongoose.connect(mongoUrl, options)
}

module.exports.mongoConnection = mongoConnection
