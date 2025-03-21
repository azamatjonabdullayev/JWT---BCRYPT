import jwt from "jsonwebtoken";

export default class JWTService {
  generateToken(payload) {
    if (!process.env.JWT_SECRET)
      throw new Error("JWT_SECRET not defined in environment");

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
  }

  verifyToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw { status_code: 401, message: "Invalid or expired token" };
    }
  }
}
