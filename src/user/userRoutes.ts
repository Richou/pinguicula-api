import {Request, Response} from "express";
import {UploadUtil} from "../common/uploadUtil";
import {UserController} from "./userController";

export class UserRoutes {

  constructor(private userCtrl: UserController, private uploadUtil: UploadUtil) {

  }

  public routes(app): void {
    app.route("/v1/users").post((request: Request, response: Response) => this.userCtrl.createUser(request, response));
    app.route("/v1/users/:id").get((request: Request, response: Response) => this.userCtrl.getUser(request, response));
    app.route("/v1/users/:id").put((request: Request, response: Response) => this.userCtrl.editUser(request, response));
    app.route("/v1/users/:id").delete((request: Request, response: Response) => this.userCtrl.deleteUser(request, response));
    app.route("/v1/users/:id/avatar").post(this.uploadUtil.avatarUpload().single("avatar"), (request: Request, response: Response) => this.userCtrl.uploadAvatar(request, response));
    app.route("/v1/users/:id/avatar").get((request: Request, response: Response) => this.userCtrl.retrieveAvatar(request, response));
  }

}
