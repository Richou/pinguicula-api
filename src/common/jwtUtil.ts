import fs = require("fs");
import {sign} from "jsonwebtoken";

export interface KeyPair {
  publicKeyFile: string;
  privateKeyFile: string;
}

export class JwtUtil {
  private keypair: KeyPair;
  private publicKey: Buffer;
  private privateKey: Buffer;

  constructor(keypair: KeyPair) {
    this.keypair = keypair;
    this.initialize();
  }

  public initialize() {
    this.publicKey = fs.readFileSync(this.keypair.publicKeyFile);
    this.privateKey = fs.readFileSync(this.keypair.privateKeyFile);
  }

  public createToken(uid, email) {
    return sign({
      email, uid,
    }, this.privateKey, {
      algorithm: "RS512",
    });
  }

  public getPublicKey(): Buffer {
    return this.publicKey;
  }
}
