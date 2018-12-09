import {getLogger} from "log4js";
import {APPLICATION_LOG_LEVEL} from "../../config";
import {BcryptUtil} from "../common/bcryptUtil";
import {JwtUtil} from "../common/jwtUtil";
import {BadCredentialsError} from "../errors/badCredentialsError";
import {User} from "../user/userModel";
import {Credentials, UserClaims} from "./authenticationModel";

export class AuthenticationService {

  private readonly logger = getLogger("AuthenticationService");

  constructor(private jwtUtil: JwtUtil) {
    this.logger.level = APPLICATION_LOG_LEVEL;
  }

  public async doLogin(credentials: Credentials): Promise<UserClaims> {
    this.logger.info("Trying to login");
    const fromDb = await User.findOne({email: credentials.email});
    if (fromDb !== null && fromDb !== undefined && await BcryptUtil.comparePassword(fromDb.password, credentials.password)) {
      return {
        email: fromDb.email,
        uid: fromDb.uid,
        username: fromDb.username,
      };
    }
    this.logger.warn("User Not found or bad credentials");
    throw new BadCredentialsError("Bad Credentials.");
  }

  public generateJwtForUser(user: UserClaims) {
    return this.jwtUtil.createToken(user.uid, user.email);
  }
}
