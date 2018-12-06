const AuthenticationCtrl = require('./authentication.controller')

module.exports = function (app) {
  app.route('/v1/login').post(AuthenticationCtrl.login)
}
