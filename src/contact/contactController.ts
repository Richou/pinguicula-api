import { Request, Response } from "express";
import { ContactService } from "./contactService";

export class ContactController {
  constructor(private contactSrv: ContactService) {
  }

  public getContacts(request: Request, response: Response) {
    return response.json(this.contactSrv.getContactsByCriteria({
      firstname: request.query.firstname,
      gender: request.query.gender,
      ipaddress: request.query.ipaddress,
      lastname: request.query.lastname,
      page: request.query.page || 0,
      size: request.query.size || 20,
    }));
  }
}
