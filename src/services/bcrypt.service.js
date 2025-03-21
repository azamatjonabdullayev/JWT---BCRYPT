import bcrypt from "bcrypt";

export default class BcryptPassword {
  constructor() {
    this.hash = bcrypt;
  }

  async hashPassword(password) {
    return this.hash.hash(password, 24);
  }

  async comparePasswords(password, hashed) {
    return this.hash.compare(password, hashed);
  }
}
