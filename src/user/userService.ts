import fs = require("fs");
import {getLogger} from "log4js";
import {getType} from "mime";
import uuid from "uuid/v4";
import {BcryptUtil} from "../common/bcryptUtil";
import {UploadUtil} from "../common/uploadUtil";
import {NotFoundError} from "../errors/notFoundError";
import {User, UserAvatar} from "./userModel";

const ROUND_SALT = 10;

export class UserService {
  private readonly logger = getLogger("UserService");

  constructor(private bcryptUtil: BcryptUtil, private uploadUtil: UploadUtil) {

  }

  public async createUser(user) {
    const hashedPassword = await BcryptUtil.hashPassword(user.password, ROUND_SALT);
    const toSave = {
      email: user.email,
      password: hashedPassword,
      uid: uuid(),
      username: user.username,
    };
    const userEntity = new User(toSave);
    this.logger.debug("Saving user to DB");
    return userEntity.save();
  }

  public editUser(uid, user) {
    const toSave = {
      email: user.email,
      username: user.username,
    };
    this.logger.debug("Editing user to DB");
    return User.updateOne({uid}, {$set: toSave});
  }

  public deleteUserByUid(uid) {
    this.logger.debug("Deleting user from DB");
    return User.deleteOne({uid});
  }

  public async getUserByUid(uid): Promise<User> {
    const userById = await User.findOne({uid});
    if (userById === null || userById === undefined) {
      this.logger.error("Not found");
      throw new NotFoundError(`The user with id ${uid} has not been found`);
    }
    return {
      email: userById.email,
      uid: userById.uid,
      username: userById.username,
    };
  }

  public retrieveAvatarData(id: string): UserAvatar {
    const files = fs.readdirSync(`${this.uploadUtil.getAvatarDestDir()}/`);
    const filtered = files.filter((it) => it.startsWith(`avatar-${id}`));
    if (filtered.length === 1) {
      return {
        fullPath: `${this.uploadUtil.getAvatarDestDir()}/${filtered[0]}`,
        mimeType: getType(filtered[0]),
      };
    }
    throw new NotFoundError(`The avatar for user with id ${id} has not been found`);
  }
}
