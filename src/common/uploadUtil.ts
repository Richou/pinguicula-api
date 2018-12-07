import multer = require('multer');
import mime = require('mime');

export class UploadUtil {

    private avatarDestDir;

    constructor(avatarDestDir) {
        this.avatarDestDir = avatarDestDir
    }

    public imageFilter = (request, file, callback) => {
        // accept image only
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
           return callback(new Error('Only image files are allowed!'), false)
        }
        callback(null, true)
    }
    
    public avatarUpload() {
        return multer({
            storage: multer.diskStorage({
                destination: (request, file, callback) => {
                    callback(null, `${this.avatarDestDir}/`)
                },
                filename: (request, file, callback) => {
                    callback(null, `avatar-${request.params.id}.${mime.getExtension(file.mimetype)}`)
                }
            }),
            fileFilter: this.imageFilter
          })
    }

    public getAvatarDestDir() {
        return this.avatarDestDir;
    }
}