import express = require("express");
import bodyParser = require("body-parser");
import expressJwt = require('express-jwt');
import { ContactRoutes } from './contact/contactRoutes';
import { ContactController } from "./contact/contactController";
import { ContactService } from './contact/contactService';
import { ContactMock } from './contact/contactMock';
import { CSV_FILE, PHOTO_DIR_PATH, DATABASE_URL, PRIVATE_KEY_FILE, PUBLIC_KEY_FILE, PYTHON_SCRIPT } from '../config';
import { UserService } from './user/userService';
import { BcryptUtil } from './common/bcryptUtil';
import { UploadUtil } from './common/uploadUtil';
import { JwtUtil } from './common/jwtUtil';
import { UserController } from './user/userController';
import { UserRoutes } from './user/userRoutes';
import { Database } from './db/database';
import { AuthenticationService } from "./authentication/authenticationService";
import { AuthenticationController } from "./authentication/authenticationController";
import { AuthenticationRoutes } from "./authentication/authenticationRoutes";
import { ScriptsService } from "./scripting/scriptsService";
import { ScriptsController } from "./scripting/scriptsController";
import { ScriptsRoutes } from "./scripting/scriptsRoutes";

class App {
  public app: express.Application;

  private jwtUtil = new JwtUtil({publicKeyFile: PUBLIC_KEY_FILE, privateKeyFile: PRIVATE_KEY_FILE});
  private bcryptUtil = new BcryptUtil();

  // Contact Object
  private contactMock = new ContactMock(CSV_FILE)
  private contactSrv = new ContactService(this.contactMock)
  private contactCtrl = new ContactController(this.contactSrv);
  private contactRoutes = new ContactRoutes(this.contactCtrl);

  // User Object
  private uploadUtil = new UploadUtil(PHOTO_DIR_PATH);
  private userSrv = new UserService(this.bcryptUtil, this.uploadUtil);
  private userCtrl = new UserController(this.userSrv);
  private userRoutes = new UserRoutes(this.userCtrl, this.uploadUtil);

  // Authentication Object
  private authenticationSrv = new AuthenticationService(this.jwtUtil, this.bcryptUtil);
  private authenticationCtrl = new AuthenticationController(this.authenticationSrv);
  private authenticationRoutes = new AuthenticationRoutes(this.authenticationCtrl);

  // Scripting Object
  private scriptsSrv = new ScriptsService()
  private scriptsCtrl = new ScriptsController(this.scriptsSrv, PYTHON_SCRIPT);
  private scriptsRoutes = new ScriptsRoutes(this.scriptsCtrl);

  constructor() {
    this.app = express();
    this.contactMock.initMockData();
    this.config();
    this.jwt();
    this.routes();
    this.database();
  }

  private config(): void {
    // support application/json
    this.app.use(bodyParser.json());
    //support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  private jwt(){
    this.app.use('/', expressJwt({
      secret: this.jwtUtil.getPublicKey(),
      getToken: function fromHeaderOrQuerystring (req) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
          return req.headers.authorization.split(' ')[1]
        }
        return null
      }
    }).unless({
      path: ['/v1/login', '/v1/users', '/v1/scripts/random']
    }))

    this.app.use((error, request, response, next) => {
      if (error.name === 'UnauthorizedError') {
        return response.status(403).json({
          message: 'Unauthorized'
        })
      }
    })
  }

  private routes() {
    this.contactRoutes.routes(this.app);
    this.userRoutes.routes(this.app);
    this.authenticationRoutes.routes(this.app);
    this.scriptsRoutes.routes(this.app);
  }

  private database() {
    new Database(DATABASE_URL);
  }
}

export default new App().app;