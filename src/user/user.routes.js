const UserCtrl = require('./user.controller')
const uploadUtil = require('../common/uploadUtil')

module.exports = function (app) {
  app.route('/v1/users').post(UserCtrl.createUser)
  app.route('/v1/users/:id').get(UserCtrl.getUser)
  app.route('/v1/users/:id').put(UserCtrl.editUser)
  app.route('/v1/users/:id').delete(UserCtrl.deleteUser)
  app.route('/v1/users/:id/avatar').post(uploadUtil.avatarUpload.single('avatar'), UserCtrl.uploadAvatar)
  app.route('/v1/users/:id/avatar').get(UserCtrl.retreiveAvatar)
}
