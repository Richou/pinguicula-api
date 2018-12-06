const multer = require('multer')
const log4js = require('log4js')
const mime = require('mime')

const logger = log4js.getLogger('UserController')
logger.level = process.env.APPLICATION_LOG_LEVEL
const AVATAR_DEST_DIR = process.env.PHOTO_DIR_PATH

const imageFilter = function (request, file, callback) {
  // accept image only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Only image files are allowed!'), false)
  }
  callback(null, true)
}

const avatarStorage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, `${AVATAR_DEST_DIR}/`)
  },
  filename: (request, file, callback) => {
    callback(null, `avatar-${request.params.id}.${mime.getExtension(file.mimetype)}`)
  }
})

const avatarUpload = multer({
  storage: avatarStorage,
  fileFilter: imageFilter
})

module.exports.avatarUpload = avatarUpload
module.exports.avatarDestDir = AVATAR_DEST_DIR
