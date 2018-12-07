import { Request, Response } from "express";

export class ContactController {
  constructor() {
  }

  public getContacts(request: Request, response: Response) {
    return response.json({message : "ok"});
  }
}
