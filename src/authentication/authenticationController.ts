import {Request, Response} from "express";
import {getLogger} from "log4js";
import {APPLICATION_LOG_LEVEL} from "../../config";
import {BadCredentialsError} from "../errors/badCredentialsError";
import {UserClaims} from "./authenticationModel";
import {AuthenticationService} from "./authenticationService";

export class AuthenticationController {

  private readonly logger = getLogger("AuthenticationController");

  constructor(private authenticationSrv: AuthenticationService) {
    this.logger.level = APPLICATION_LOG_LEVEL;
  }

  public async login(request: Request, response: Response): Promise<Response> {
    try {
      const logged: UserClaims = await this.authenticationSrv.doLogin(request.body);
      const token = this.authenticationSrv.generateJwtForUser(logged);
      return response.json({token});
    } catch (error) {
      this.logger.error(error);
      if (error instanceof BadCredentialsError) {
        return response.status(401).json({message: error.message});
      } else {
        return response.status(500).json({message: error.message});
      }
    }
  }
}
