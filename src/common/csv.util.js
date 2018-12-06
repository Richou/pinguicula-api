const readline = require('readline')
const fs = require('fs')
const log4js = require('log4js')
const Promise = require('bluebird')

const logger = log4js.getLogger('CsvUtil')
logger.level = process.env.APPLICATION_LOG_LEVEL

const renderCsvFile = function (csvFile) {
  return new Promise((resolve, reject) => {
    try {
      const readStream = fs.createReadStream(csvFile).on('error', error => {
        logger.warn('An error has occured, returning empty array', error)
        resolve([])
      })
      const linesStream = readline.createInterface({
        input: readStream,
        crlfDelay: Infinity
      })
      let currentLine = 0
      const rendered = []
      let headers = []
      linesStream.on('line', line => {
        if (currentLine !== 0) {
          const splitted = line.split(',')
          if (splitted.length !== headers.length) {
            logger.warn('The line is not well formated, skipping')
          } else {
            let lineObject = {}
            for (let index = 0; index < splitted.length; index++) {
              lineObject[headers[index].trim()] = splitted[index].trim()
            }
            rendered.push(lineObject)
          }
        } else {
          headers = line.split(',')
        }
        currentLine++
      }).once('close', () => {
        logger.debug('CSV File parsed and rendered')
        resolve(rendered)
      })
    } catch (error) {
      logger.error(error)
    }
  })
}

module.exports.renderCsvFile = renderCsvFile
