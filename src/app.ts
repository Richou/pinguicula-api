import * as express from "express";
import * as bodyParser from "body-parser";
import { ContactRoutes } from './contact/ContactRoutes';
import { ContactController } from "./contact/ContactController";

class App {
  public app: express.Application;
  public contactCtrl = new ContactController();
  public contactRoutes = new ContactRoutes(this.contactCtrl);

  constructor() {
    this.app = express();
    this.config();
  }

  private config(): void {
    // support application/json
    this.app.use(bodyParser.json());
    //support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.contactRoutes.routes(this.app);
  }
}

export default new App().app;