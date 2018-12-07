import { ContactMock } from './contactMock';

export class ContactService {

    constructor(private contactMock: ContactMock) {
        
    }

    public getContactsByCriteria(criteria) {
        const filtered = this._filterByCriteria(criteria)
        return this._paginate(filtered, criteria.page, criteria.size)
    }
      
    private _filterByCriteria(criteria) {
        return this.contactMock.getMockedData().filter(it => this._filterField(criteria.firstname, it.first_name) &&
            this._filterField(criteria.lastname, it.last_name) &&
            this._filterField(criteria.gender, it.gender) &&
            this._filterField(criteria.ipaddress, it.ip_address))
    }
      
    private _filterField(fieldCrit, value) {
        return fieldCrit === null || fieldCrit === undefined || (fieldCrit !== null && fieldCrit !== undefined && value.toLowerCase().startsWith(fieldCrit.toLowerCase()))
    }
      
    private _paginate(array, number, size) {
        number = number - 1
        if (number < 0) number = 0
        return array.slice(number * size, (number + 1) * size)
    }
}