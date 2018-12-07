import jwt = require('jsonwebtoken');
import fs = require('fs');

export class JwtUtil{
    private keypair;
    private publicKey;
    private privateKey;

    constructor(keypair) {
        this.keypair = keypair
        this.initialize();
    }

    public initialize() {
        this.publicKey = fs.readFileSync(this.keypair.publicKeyFile);
        this.privateKey = fs.readFileSync(this.keypair.privateKeyFile);
    }

    public createToken(uid, email) {
        return jwt.sign({
          uid: uid, email: email
        }, this.privateKey, {
          algorithm: 'RS512'
        })
      }

    public getPublicKey() {
        return this.publicKey;
    }
}