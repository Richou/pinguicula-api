const log4js = require('log4js')
const userSrv = require('./user.service')
const fs = require('fs')

const logger = log4js.getLogger('UserController')
logger.level = process.env.APPLICATION_LOG_LEVEL

module.exports.createUser = async function (request, response) {
  try {
    logger.info('Creating user')
    await userSrv.createUser(request.body)
    response.json({ message: 'OK' })
  } catch (error) {
    logger.error(error)
    response.status(500).json({ message: 'KO' })
  }
}

module.exports.editUser = async function (request, response) {
  try {
    await userSrv.editUser(request.params.id, request.body)
    response.json({ message: 'OK' })
  } catch (error) {
    logger.error(error)
    response.status(400).json({ message: 'Bad Request' })
  }
}

module.exports.deleteUser = async function (request, response) {
  try {
    await userSrv.deleteUserByUid(request.params.id)
    response.json({ message: 'OK' })
  } catch (error) {
    logger.error(error)
    response.status(500).json({ mesage: 'KO' })
  }
}

module.exports.getUser = async function (request, response) {
  try {
    const fetchedUser = await userSrv.getUserByUid(request.params.id)
    response.json(fetchedUser)
  } catch (error) {
    if (error.message === 'NOT_FOUND') {
      logger.warn('Trying to get not existed resource')
      response.status(404).json({ mesage: 'Resource not found' })
    } else {
      logger.error(error)
      response.status(500).json({ mesage: 'KO' })
    }
  }
}

module.exports.uploadAvatar = function (request, response) {
  response.json({ message: 'Ok' })
}

module.exports.retreiveAvatar = function (request, response) {
  try {
    const avatarData = userSrv.retreiveAvatarData(request.params.id)
    response.setHeader('Content-type', avatarData.mimetype)
    fs.createReadStream(avatarData.fullpath).pipe(response)
  } catch (error) {
    logger.error(error)
    response.status(404).json({ message: 'Avatar not found.' })
  }
}
