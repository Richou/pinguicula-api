import bodyParser = require("body-parser");
import express = require("express");
import expressJwt = require("express-jwt");
import log4js = require("log4js");
import {Application} from "express";
import {
  APPLICATION_LOG_LEVEL,
  CSV_FILE,
  DATABASE_URL,
  PHOTO_DIR_PATH,
  PRIVATE_KEY_FILE,
  PUBLIC_KEY_FILE,
  PYTHON_SCRIPT,
} from "../config";
import {AuthenticationController} from "./authentication/authenticationController";
import {AuthenticationRoutes} from "./authentication/authenticationRoutes";
import {AuthenticationService} from "./authentication/authenticationService";
import {BcryptUtil} from "./common/bcryptUtil";
import {JwtUtil} from "./common/jwtUtil";
import {UploadUtil} from "./common/uploadUtil";
import {ContactController} from "./contact/contactController";
import {ContactMock} from "./contact/contactMock";
import {ContactRoutes} from "./contact/contactRoutes";
import {ContactService} from "./contact/contactService";
import {Database} from "./db/database";
import {ScriptsController} from "./scripting/scriptsController";
import {ScriptsRoutes} from "./scripting/scriptsRoutes";
import {ScriptsService} from "./scripting/scriptsService";
import {UserController} from "./user/userController";
import {UserRoutes} from "./user/userRoutes";
import {UserService} from "./user/userService";

class App {

  private readonly logger = log4js.getLogger("App");

  private readonly app: express.Application;

  private jwtUtil = new JwtUtil({publicKeyFile: PUBLIC_KEY_FILE, privateKeyFile: PRIVATE_KEY_FILE});
  private bcryptUtil = new BcryptUtil();

  // Contact Object
  private contactMock = new ContactMock(CSV_FILE);
  private contactSrv = new ContactService(this.contactMock);
  private contactCtrl = new ContactController(this.contactSrv);
  private contactRoutes = new ContactRoutes(this.contactCtrl);

  // User Object
  private uploadUtil = new UploadUtil(PHOTO_DIR_PATH);
  private userSrv = new UserService(this.bcryptUtil, this.uploadUtil);
  private userCtrl = new UserController(this.userSrv);
  private userRoutes = new UserRoutes(this.userCtrl, this.uploadUtil);

  // Authentication Object
  private authenticationSrv = new AuthenticationService(this.jwtUtil);
  private authenticationCtrl = new AuthenticationController(this.authenticationSrv);
  private authenticationRoutes = new AuthenticationRoutes(this.authenticationCtrl);

  // Scripting Object
  private scriptsSrv = new ScriptsService();
  private scriptsCtrl = new ScriptsController(this.scriptsSrv, PYTHON_SCRIPT);
  private scriptsRoutes = new ScriptsRoutes(this.scriptsCtrl);

  constructor() {
    this.logger.level = APPLICATION_LOG_LEVEL;
    this.app = express();
    this.contactMock.initMockData();
    this.config();
    this.database();
    this.jwt();
    this.routes();
  }

  public getApplication(): Application {
    return this.app;
  }

  private config(): void {
    // support application/json
    this.app.use(bodyParser.json());
    // support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  private jwt() {
    this.app.use("/", expressJwt({
      getToken: (request) => {
        if (request.headers.authorization && request.headers.authorization.split(" ")[0] === "Bearer") {
          return request.headers.authorization.split(" ")[1];
        }
        return null;
      },
      secret: this.jwtUtil.getPublicKey(),
    }).unless((request: Request) => {
      return request.url === "/v1/login" || (request.url === "/v1/users" && request.method === "POST") || request.url === "/v1/contacts" || request.url === "/v1/scripts/random"
    }));

    this.app.use((error, request, response, next) => {
      if (error.name === "UnauthorizedError") {
        return response.status(403).json({
          message: "Unauthorized",
        });
      }
    });
  }

  private routes() {
    this.contactRoutes.routes(this.app);
    this.userRoutes.routes(this.app);
    this.authenticationRoutes.routes(this.app);
    this.scriptsRoutes.routes(this.app);
  }

  private async database() {
    try {
      const database  = new Database(DATABASE_URL);
      await database.mongoSetup();
    } catch (error) {
      this.logger.error("Cannot connect to DB, please check DB Connection");
      process.exit(1);
    }
  }
}

export default new App().getApplication();
