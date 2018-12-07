import { Request, Response } from "express";
import { ContactService } from './contactService';

export class ContactController {
  constructor(private contactSrv: ContactService) {
  }

  public getContacts(request: Request, response: Response) {
    return response.json(this.contactSrv.getContactsByCriteria({
      page: request.query.page || 0,
      size: request.query.size || 20,
      firstname: request.query.firstname,
      lastname: request.query.lastname,
      gender: request.query.gender,
      ipaddress: request.query.ipaddress
    }))
  }
}
