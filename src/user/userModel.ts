import { Document, Model, model, Schema } from "mongoose";

export interface User {
  email: string;
  password?: string;
  uid: string;
  username: string;
}

export interface UserModel extends User, Document {}

export interface UserAvatar {
  fullPath: string;
  mimeType: string;
}

export const UserSchema: Schema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  uid: { type: String, required: true },
  username: { type: String, required: true },
});

export const User: Model<UserModel> = model<UserModel>("User", UserSchema);
