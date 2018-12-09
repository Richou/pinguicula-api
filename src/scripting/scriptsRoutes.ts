import {Request, Response} from "express";
import {ScriptsController} from "./scriptsController";

export class ScriptsRoutes {
  constructor(private scriptsCtrl: ScriptsController) {

  }

  public routes(app): void {
    app.route("/v1/scripts/random").get((request: Request, response: Response) => this.scriptsCtrl.runRandomPyScript(request, response));
  }
}
