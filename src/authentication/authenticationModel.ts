export interface Credentials {
  email: string;
  password: string;
}

export interface UserClaims {
  uid: string;
  email: string;
  username: string;
}

export interface Token {
  token: string;
}
