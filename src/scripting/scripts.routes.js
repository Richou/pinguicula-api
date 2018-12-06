const ScriptsCtrl = require('./scripts.controller')

module.exports = function (app) {
  app.route('/v1/scripts/random').get(ScriptsCtrl.runRandomPyScript)
}
