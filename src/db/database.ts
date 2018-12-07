import mongoose = require('mongoose');

const options = {
    useNewUrlParser: true,
    poolSize: 10
  }

export class Database {
    constructor(private mongoUrl: String) {
        this.mongoSetup()
    }

    private mongoSetup() {
        mongoose.connect(this.mongoUrl, options);
    }
}