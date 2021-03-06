import {Application, Request, Response} from "express";
import {AuthenticationController} from "./authenticationController";

export class AuthenticationRoutes {

  constructor(private authenticationCtrl: AuthenticationController) {

  }

  public routes(app: Application): void {
    app.route("/v1/login").post((request: Request, response: Response) => this.authenticationCtrl.login(request, response));
  }
}
