import bcrypt = require("bcrypt");

export class BcryptUtil {
  public static hashPassword(password, saltRounds) {
    return bcrypt.hash(password, saltRounds);
  }

  public static comparePassword(hashed, plaintext) {
    return bcrypt.compare(plaintext, hashed);
  }
}
