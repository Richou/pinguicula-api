import mongoose = require('mongoose')
import { BcryptUtil } from '../common/bcryptUtil'
import uuid from 'uuid/v4'
import fs = require('fs')
import { UploadUtil } from '../common/uploadUtil'
import mime = require('mime')
import { UserSchema } from './userModel';

const User = mongoose.model('User', UserSchema)

const ROUND_SALT = 10

export class UserService {
    constructor(private bcryptUtil: BcryptUtil, private uploadUtil: UploadUtil) {

    }

    public async createUser(user) {
      const hashedPassword = await this.bcryptUtil.hashPassword(user.password, ROUND_SALT)
      const toSave = {
        uid: uuid(),
        username: user.username,
        password: hashedPassword,
        email: user.email
      }
      const userEntity = new User(toSave)
      return userEntity.save()
    }
      
    public editUser(uid, user) {
      const toSave = {
        username: user.username,
        email: user.email
      }
      return User.updateOne({ uid: uid }, { $set: toSave })
    }
      
    public deleteUserByUid(uid) {
      return User.deleteOne({ uid: uid })
    }
      
    public async getUserByUid(uid) {
        try {
            const userById = await User.findOne({ uid: uid })
            if (userById === null || userById === undefined) throw new Error('NOT_FOUND')
            return {
              uid: userById.uid,
              username: userById.username,
              email: userById.email
            }
        } catch(error) {
            console.error(error);
        }
    }
      
      public retreiveAvatarData(id) {
        const files = fs.readdirSync(`${this.uploadUtil.getAvatarDestDir()}/`)
        const filtered = files.filter(it => it.startsWith(`avatar-${id}`))
        if (filtered.length === 1) {
          return {
            fullpath: `${this.uploadUtil.getAvatarDestDir()}/${filtered[0]}`,
            mimetype: mime.getType(filtered[0])
          }
        }
        throw new Error('NotFound')
      }
}
