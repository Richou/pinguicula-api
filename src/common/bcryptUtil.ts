import bcrypt = require('bcrypt');

export class BcryptUtil {
    public hashPassword(password, saltRounds) {
        return bcrypt.hash(password, saltRounds)
      }
      
    public comparePassword(hashed, plaintext) {
        return bcrypt.compare(plaintext, hashed)
    }
}