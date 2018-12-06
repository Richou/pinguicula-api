const log4js = require('log4js')
const scriptsSrv = require('./scripts.service')

const logger = log4js.getLogger('ScriptsController')
logger.level = process.env.APPLICATION_LOG_LEVEL

const runRandomPyScript = async function (request, response) {
  try {
    const randomResult = await scriptsSrv.runPythonScript(`${global.__basedir}/assets/randomize.py`)
    response.json({ result: randomResult })
  } catch (error) {
    logger.error(error)
    response.status(500).json({ message: 'KO' })
  }
}

module.exports.runRandomPyScript = runRandomPyScript
