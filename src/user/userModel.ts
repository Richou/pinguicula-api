import mongoose = require('mongoose');

const Schema = mongoose.Schema

export const UserSchema = new Schema({
  uid: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true }
})