import {Request, Response} from "express";
import fs = require("fs");
import {getLogger} from "log4js";
import {APPLICATION_LOG_LEVEL} from "../../config";
import {NotFoundError} from "../errors/notFoundError";
import {UserService} from "./userService";

export class UserController {
  private readonly logger = getLogger("UserController");

  constructor(private userSrv: UserService) {
    this.logger.level = APPLICATION_LOG_LEVEL;
  }

  public async createUser(request: Request, response: Response) {
    try {
      this.logger.info("Creating user");
      await this.userSrv.createUser(request.body);
      return response.json({message: "OK"});
    } catch (error) {
      this.logger.error(error);
      return response.status(500).json({message: "KO"});
    }
  }

  public async editUser(request: Request, response: Response) {
    try {
      await this.userSrv.editUser(request.params.id, request.body);
      return response.json({message: "OK"});
    } catch (error) {
      this.logger.error(error);
      return response.status(400).json({message: "Bad Request"});
    }
  }

  public async deleteUser(request: Request, response: Response) {
    try {
      await this.userSrv.deleteUserByUid(request.params.id);
      return response.json({message: "OK"});
    } catch (error) {
      this.logger.error(error);
      return response.status(500).json({mesage: "KO"});
    }
  }

  public async getUser(request: Request, response: Response) {
    try {
      const fetchedUser = await this.userSrv.getUserByUid(request.params.id);
      return response.json(fetchedUser);
    } catch (error) {
      if (error instanceof NotFoundError) {
        this.logger.warn("Trying to get not existed resource");
        return response.status(404).json({mesage: "Resource not found"});
      } else {
        this.logger.error(error);
        return response.status(500).json({mesage: "KO"});
      }
    }
  }

  public uploadAvatar(request: Request, response: Response) {
    return response.json({message: "Ok"});
  }

  public retrieveAvatar(request: Request, response: Response) {
    try {
      const avatarData = this.userSrv.retrieveAvatarData(request.params.id);
      response.setHeader("Content-type", avatarData.mimeType);
      return fs.createReadStream(avatarData.fullPath).pipe(response);
    } catch (error) {
      this.logger.error(error);
      return response.status(404).json({message: "Avatar not found."});
    }
  }

}
