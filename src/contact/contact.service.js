const mock = require('./contact.mock')

const getContactsByCriteria = function (criteria) {
  const filtered = _filterByCriteria(criteria)
  return _paginate(filtered, criteria.page, criteria.size)
}

const _filterByCriteria = function (criteria) {
  return mock.getMockedData().filter(it => _filterField(criteria.firstname, it.first_name) &&
        _filterField(criteria.lastname, it.last_name) &&
        _filterField(criteria.gender, it.gender) &&
        _filterField(criteria.ipaddress, it.ip_address))
}

const _filterField = function (fieldCrit, value) {
  return fieldCrit === null || fieldCrit === undefined || (fieldCrit !== null && fieldCrit !== undefined && value.toLowerCase().startsWith(fieldCrit.toLowerCase()))
}

const _paginate = function (array, number, size) {
  number = number - 1
  if (number < 0) number = 0
  return array.slice(number * size, (number + 1) * size)
}

module.exports.getContactsByCriteria = getContactsByCriteria
