require('dotenv').config()
const express = require('express')
const expressJwt = require('express-jwt')
const bodyParser = require('body-parser')
const app = express()
const log4js = require('log4js')
const logger = log4js.getLogger('ServerApi')
const database = require('./src/db/database')
const jwtUtil = require('./src/common/jwt.util')
logger.level = process.env.APPLICATION_LOG_LEVEL

global.__basedir = __dirname

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', expressJwt({
  secret: jwtUtil.getPublicKey(),
  getToken: function fromHeaderOrQuerystring (req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1]
    }
    return null
  }
}).unless({
  path: ['/v1/login', '/v1/users', '/v1/scripts/random']
}))

app.use((error, request, response, next) => {
  if (error.name === 'UnauthorizedError') {
    return response.status(403).json({
      message: 'Unauthorized'
    })
  }
})

const listen = function () {
  app.listen(process.env.SERVER_PORT, error => {
    if (error) {
      logger.error(error)
      process.exit(1)
    }

    // Bootstrap models
    require('./src/user/user.model')
    require('./src/contact/contact.mock').initMockData('assets/mock_data.csv')

    // TODO: Make this dynamic
    require('./src/user/user.routes')(app)
    require('./src/authentication/authentication.routes')(app)
    require('./src/scripting/scripts.routes')(app)
    require('./src/contact/contact.routes')(app)

    logger.info('Server Api running on port', process.env.SERVER_PORT)
  })
}

const startServer = async function () {
  try {
    logger.debug('Connecting to database ...')
    await database.mongoConnection()
    logger.debug('Connection to database succeed.')
    listen()
  } catch (error) {
    logger.error('Cannot create connection on database', error)
  }
}

logger.info('Starting Pinguicula Api Server...')
startServer()
