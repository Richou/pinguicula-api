import log4js = require('log4js')
import { ScriptsService } from './scripts.service'

const logger = log4js.getLogger('ScriptsController')
logger.level = process.env.APPLICATION_LOG_LEVEL

export class ScriptsController {
    constructor(private scriptsSrv: ScriptsService, private scriptFile) {

    }

    public async runRandomPyScript(request, response) {
        try {
          const randomResult = await this.scriptsSrv.runPythonScript(this.scriptFile)
          response.json({ result: randomResult })
        } catch (error) {
          logger.error(error)
          response.status(500).json({ message: 'KO' })
        }
      }
}
