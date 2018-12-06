const mongoose = require('mongoose')
const bcryptUtil = require('../common/bcrypt.util')
const User = mongoose.model('User')
const uuid = require('uuid/v4')
const fs = require('fs')
const uploadUtil = require('../common/uploadUtil')
const mime = require('mime')

const ROUND_SALT = 10

const createUser = async function (user) {
  const hashedPassword = await bcryptUtil.hashPassword(user.password, ROUND_SALT)
  const toSave = {
    uid: uuid(),
    username: user.username,
    password: hashedPassword,
    email: user.email
  }
  const userEntity = new User(toSave)
  return userEntity.save()
}

const editUser = function (uid, user) {
  const toSave = {
    username: user.username,
    email: user.email
  }
  return User.updateOne({ uid: uid }, { $set: toSave })
}

const deleteUserByUid = function (uid) {
  return User.deleteOne({ uid: uid })
}

const getUserByUid = async function (uid) {
  const userById = await User.findOne({ uid: uid })
  if (userById === null || userById === undefined) throw new Error('NOT_FOUND')
  return {
    uid: userById.uid,
    username: userById.username,
    email: userById.email
  }
}

const retreiveAvatarData = function (id) {
  const files = fs.readdirSync(`${uploadUtil.avatarDestDir}/`)
  const filtered = files.filter(it => it.startsWith(`avatar-${id}`))
  if (filtered.length === 1) {
    return {
      fullpath: `${uploadUtil.avatarDestDir}/${filtered[0]}`,
      mimetype: mime.getType(filtered[0])
    }
  }
  throw new Error('NotFound')
}

module.exports.createUser = createUser
module.exports.editUser = editUser
module.exports.deleteUserByUid = deleteUserByUid
module.exports.getUserByUid = getUserByUid
module.exports.retreiveAvatarData = retreiveAvatarData
