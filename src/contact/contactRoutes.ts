import {Request, Response} from "express";
import {ContactController} from "./contactController";

export class ContactRoutes {

  constructor(private contactCtrl: ContactController) {

  }

  public routes(app): void {
    app.route("/v1/contacts").get((request: Request, response: Response) => this.contactCtrl.getContacts(request, response));
    app.route('/v1/contacts').post((request: Request, response: Response) => this.contactCtrl.createContact(request, response));
    app.route('/v1/contacts/:id').get((request: Request, response: Response) => this.contactCtrl.doGetUserById(request, response));
    app.route('/v1/contacts/:id').delete((request: Request, response: Response) => this.contactCtrl.doDeleteUser(request, response));
    app.route('/v1/contacts/:id').put((request:Request, response: Response) => this.contactCtrl.doEditContact(request, response));
  }

}
