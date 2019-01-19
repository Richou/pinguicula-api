import { Request, Response } from "express";
import { ContactService } from "./contactService";
import {getLogger} from "log4js";
import {APPLICATION_LOG_LEVEL} from "../../config";
import {ContactRequest} from "./contactModel";
import {NotFoundError} from "../errors/notFoundError";

export class ContactController {
  private readonly logger = getLogger("ContactController");

  constructor(private contactSrv: ContactService) {
    this.logger.level = APPLICATION_LOG_LEVEL;
  }

  public async getContacts(request: Request, response: Response) {
    try {
      const results = await this.contactSrv.getContactsByCriteria({
        firstname: request.query.firstname,
        lastname: request.query.lastname,
        page: request.query.page || 0,
        size: request.query.size || 20,
      });
      return response.json(results);
    } catch (error) {
      this.logger.error(error);
      return response.status(500).json({mesage: "KO"});
    }
  }

  public async createContact(request: Request, response: Response) {
    try {
      const contactReq: ContactRequest = request.body;
      this.logger.info("Creating contact", contactReq);
      await this.contactSrv.doCreateContact(contactReq);
      return response.json({message: "OK"});
    } catch (error) {
      this.logger.error(error.message);
      return response.status(500).json({mesage: "KO"});
    }
  }

  public async doEditContact(request: Request, response: Response) {
    try {
      this.logger.debug(`Editing resource with id ${request.params.id}`);
      await this.contactSrv.editContact(request.params.id, request.body);
      return response.json({message: "OK"});
    } catch (error) {
      this.logger.error(error.message);
      return response.status(500).json({mesage: "KO"});
    }
  }

  public async doDeleteUser(request: Request, response: Response) {
    try {
      await this.contactSrv.doDeleteContact(request.params.id);
      return response.json({message: "OK"});
    } catch (error) {
      this.logger.error(error);
      return response.status(500).json({mesage: "KO"});
    }
  }

  public async doGetUserById(request: Request, response: Response) {
    try {
      const fetchedContact = await this.contactSrv.getContactByUid(request.params.id);
      return response.json(fetchedContact);
    } catch (error) {
      if (error instanceof NotFoundError) {
        this.logger.warn("Trying to get not existed resource");
        return response.status(404).json({mesage: "Resource not found"});
      } else {
        this.logger.error(error);
        return response.status(500).json({mesage: "KO"});
      }
    }
  }
}
