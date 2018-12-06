const log4js = require('log4js')
const contactSrv = require('./contact.service')

const logger = log4js.getLogger('ContactController')
logger.level = process.env.APPLICATION_LOG_LEVEL

const getContacts = function (request, response) {
  response.json(contactSrv.getContactsByCriteria({
    page: request.query.page || 0,
    size: request.query.size || 20,
    firstname: request.query.firstname,
    lastname: request.query.lastname,
    gender: request.query.gender,
    ipaddress: request.query.ipaddress
  }))
}

module.exports.getContacts = getContacts
