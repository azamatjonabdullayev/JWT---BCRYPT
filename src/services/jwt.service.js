import jwt from "jsonwebtoken";

export default class JWTService {
  constructor() {
    this.jwt = jwt;
  }

  generateToken(payload) {
    try {
      return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
    } catch (error) {
      throw error;
    }
  }

  verifyToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw error;
    }
  }
}
