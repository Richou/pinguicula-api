import {Contact, ContactRequest, ContactCriteria} from "./contactModel";
import {getLogger} from "log4js";
import {APPLICATION_LOG_LEVEL} from "../../config";
import * as v4 from "uuid/v4";
import {User} from "../user/userModel";
import {NotFoundError} from "../errors/notFoundError";

export class ContactService {

  private readonly logger = getLogger("ContactService");

  constructor() {
    this.logger.level = APPLICATION_LOG_LEVEL;
  }

  public async getContactsByCriteria(criteria: ContactCriteria): Promise<Array<Contact>> {
    this.logger.info("Trying to get", criteria);
    return await Contact.find();
  }

  public async doCreateContact(contactReq: ContactRequest): Promise<Contact> {
    try {
      const entity = {
        uid: v4(),
        ...contactReq,
      };
      return await Contact.create(entity)
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  public async editContact(uid, contact:ContactRequest): Promise<Contact> {
    try {
      this.logger.debug("Editing Contact to DB");
      return await Contact.updateOne({uid}, {$set: contact});
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  public async doDeleteContact(uid) {
    try {
      this.logger.debug("Deleting Contact from DB");
      return await Contact.deleteOne({uid});
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  public async getContactByUid(uid): Promise<Contact> {
    const contactById = await Contact.findOne({uid});
    if (contactById === null || contactById === undefined) {
      this.logger.error("Not found");
      throw new NotFoundError(`The user with id ${uid} has not been found`);
    }
    return {
      address: contactById.address,
      email: contactById.email,
      firstName: contactById.firstName,
      lastName: contactById.lastName,
      uid: contactById.uid,
      username: contactById.username,
    };
  }
}
