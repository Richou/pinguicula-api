const ContactCtrl = require('./contact.controller')

module.exports = function (app) {
  app.route('/v1/contacts').get(ContactCtrl.getContacts)
}
