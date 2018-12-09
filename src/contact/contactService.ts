import {ContactMock} from "./contactMock";
import {Contact, ContactCriteria} from "./contactModel";

export class ContactService {

  constructor(private contactMock: ContactMock) {

  }

  public getContactsByCriteria(criteria: ContactCriteria): Contact[] {
    const filtered = this._filterByCriteria(criteria);
    return this._paginate(filtered, criteria.page, criteria.size);
  }

  private _filterByCriteria(criteria: ContactCriteria): Contact[] {
    return this.contactMock.getMockedData().filter((it) => this._filterField(criteria.firstname, it.first_name) &&
      this._filterField(criteria.lastname, it.last_name) &&
      this._filterField(criteria.gender, it.gender) &&
      this._filterField(criteria.ipaddress, it.ip_address));
  }

  private _filterField(fieldCrit: string, value: string): boolean {
    return fieldCrit === null || fieldCrit === undefined || value.toLowerCase().startsWith(fieldCrit.toLowerCase());
  }

  private _paginate(array: Contact[], page: number, size: number): Contact[] {
    let newPage = page - 1;
    if (newPage < 0) {
      newPage = 0;
    }
    return array.slice(newPage * size, (newPage + 1) * size);
  }
}
