const log4js = require('log4js')
const authenticationSrv = require('./authentication.service')

const logger = log4js.getLogger('AuthenticationController')
logger.level = process.env.APPLICATION_LOG_LEVEL

const login = async function (request, response) {
  try {
    const logged = await authenticationSrv.doLogin(request.body)
    const token = authenticationSrv.generateJwtForUser(logged)
    response.json({ token: token })
  } catch (error) {
    logger.error(error)
    if (error.message === 'BAD_CREDENTIALS') {
      response.status(401).json({ message: 'Bad Credentials' })
    } else {
      response.status(500).json({ message: 'KO' })
    }
  }
}

module.exports.login = login
