import mongoose = require('mongoose');
import { UserSchema } from '../user/userModel';
import { JwtUtil } from '../common/jwtUtil';
import { BcryptUtil } from '../common/bcryptUtil';

const User = mongoose.model('User', UserSchema)

export class AuthenticationService {
    constructor(private jwtUtil:JwtUtil, private bcryptUtil: BcryptUtil) {

    }

    public async doLogin(credentials) {
        const fromDb = await User.findOne({ email: credentials.email })
        if (fromDb !== null && fromDb !== undefined && await this.bcryptUtil.comparePassword(fromDb.password, credentials.password)) {
          return {
            uid: fromDb.uid,
            username: fromDb.username,
            email: fromDb.email
          }
        }
        throw new Error('BAD_CREDENTIALS')
      }
      
    public generateJwtForUser(user) {
      return this.jwtUtil.createToken(user.uid, user.email)
    }
}