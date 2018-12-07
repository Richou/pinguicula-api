const log4js = require('log4js')
import fs = require('fs')
import { UserService } from './userService';

const logger = log4js.getLogger('UserController')
logger.level = process.env.APPLICATION_LOG_LEVEL

export class UserController {
    constructor(private userSrv: UserService) {

    }

    public async createUser(request, response) {
      try {
        logger.info('Creating user')
        await this.userSrv.createUser(request.body)
        response.json({ message: 'OK' })
      } catch (error) {
        logger.error(error)
        response.status(500).json({ message: 'KO' })
      }
    }

    public async editUser(request, response) {
        try {
            await this.userSrv.editUser(request.params.id, request.body)
            response.json({ message: 'OK' })
        } catch (error) {
            logger.error(error)
            response.status(400).json({ message: 'Bad Request' })
      }
    }
      
    public async deleteUser(request, response) {
        try {
          await this.userSrv.deleteUserByUid(request.params.id)
          response.json({ message: 'OK' })
        } catch (error) {
          logger.error(error)
          response.status(500).json({ mesage: 'KO' })
        }
      }
      
    public async getUser(request, response) {
        try {
          const fetchedUser = await this.userSrv.getUserByUid(request.params.id)
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
      
      public uploadAvatar(request, response) {
        response.json({ message: 'Ok' })
      }
      
      public retreiveAvatar = (request, response) => {
        try {
          const avatarData = this.userSrv.retreiveAvatarData(request.params.id)
          response.setHeader('Content-type', avatarData.mimetype)
          fs.createReadStream(avatarData.fullpath).pipe(response)
        } catch (error) {
          logger.error(error)
          response.status(404).json({ message: 'Avatar not found.' })
        }
      }
      
    
}