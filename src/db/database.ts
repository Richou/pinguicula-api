import mongoose = require("mongoose");
import {Mongoose} from "mongoose";

const options = {
  poolSize: 10,
  useNewUrlParser: true,
};

export class Database {
  constructor(private mongoUrl: string) {

  }

  public mongoSetup(): Promise<Mongoose> {
    return mongoose.connect(this.mongoUrl, options);
  }
}
