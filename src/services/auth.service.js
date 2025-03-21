import pool from "../models/database.js";
import BcryptPassword from "./bcrypt.service.js";
import JWTService from "./jwt.service.js";

export default class AuthService {
  constructor() {
    this.bcrypt = new BcryptPassword();
    this.jwt = new JWTService();
  }

  async login(username, password) {
    const user = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);

    if (user.rows.length === 0) {
      throw { status_code: 404, message: "User not found" };
    }

    const isMatch = await this.bcrypt.comparePasswords(
      password,
      user.rows[0].password
    );

    if (!isMatch) {
      throw { status_code: 401, message: "Invalid password" };
    }

    const token = { id: user.rows[0].id, username: user.rows[0].username };

    return this.jwt.generateToken(token);
  }

  async register(username, password, fullname) {
    const user = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);

    if (user.rows.length > 0) {
      throw { status_code: 409, message: "User already exists!" };
    }

    const hashedPassword = await this.bcrypt.hashPassword(password);

    const newUser = await pool.query(
      "INSERT INTO users (username, password, full_name) VALUES($1, $2, $3) RETURNING *",
      [username, hashedPassword, fullname]
    );

    const userToken = {
      id: newUser.rows[0].id,
      username: newUser.rows[0].username,
      fullname: newUser.rows[0].full_name,
    };

    return {
      token: this.jwt.generateToken(userToken),
      user: userToken,
    };
  }
}
