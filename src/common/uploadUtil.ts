import {Request} from "express";
import {getExtension} from "mime";
import multer = require("multer");

export class UploadUtil {

  private readonly avatarDestDir: string;

  constructor(avatarDestDir) {
    this.avatarDestDir = avatarDestDir;
  }

  public avatarUpload() {
    return multer({
      fileFilter: (request: Request, file: Express.Multer.File, callback) => this.imageFilter(file, callback),
      storage: multer.diskStorage({
        destination: (request: Request, file: Express.Multer.File, callback) => {
          callback(null, `${this.avatarDestDir}/`);
        },
        filename: (request: Request, file: Express.Multer.File, callback) => {
          callback(null, `avatar-${request.params.id}.${getExtension(file.mimetype)}`);
        },
      }),
    });
  }

  public getAvatarDestDir() {
    return this.avatarDestDir;
  }

  private imageFilter(file: Express.Multer.File, callback) {
    // accept image only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return callback(new Error("Only image files are allowed!"), false);
    }
    return callback(null, true);
  }
}
