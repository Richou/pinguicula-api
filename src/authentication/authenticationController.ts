import log4js = require('log4js');
import { AuthenticationService } from './authenticationService';

const logger = log4js.getLogger('AuthenticationController')
logger.level = process.env.APPLICATION_LOG_LEVEL

export class AuthenticationController {
    constructor(private authenticationSrv: AuthenticationService) {

    }

    public login = async (request, response) => {
        try {
          const logged = await this.authenticationSrv.doLogin(request.body)
          const token = this.authenticationSrv.generateJwtForUser(logged)
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
}