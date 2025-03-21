import bcrypt from "bcrypt";

export default class BcryptPassword {
  constructor() {
    this.hash = bcrypt;
  }

  async hashPassword(password) {
    return await this.hash.hash(password, 12);
  }

  async comparePasswords(password, hashed) {
    return await this.hash.compare(password, hashed);
  }
}
