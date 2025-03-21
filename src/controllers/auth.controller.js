import AuthService from "../services/auth.service.js";

export default class AuthController {
  constructor() {
    this.auth_service = new AuthService();
  }

  async userLogin(req, res) {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        res.status(400).send("All fields are required");
      } else {
        const token = await this.auth_service.login(username, password);
        res.status(200).send(token);
      }
    } catch (error) {
      res
        .status(error.status_code || 500)
        .json({ message: error.message || "Internal server error" });
    }
  }

  async userRegister(req, res) {
    try {
      const { username, password, fullname } = req.body;
      if (!username || !password || !fullname) {
        throw { status_code: 400, message: "All fields are required" };
      }

      const token = await this.auth_service.register(
        username,
        password,
        fullname
      );
      res.status(201).json(token);
    } catch (error) {
      res
        .status(error.status_code || 500)
        .json({ message: error.message || "Internal server error" });
    }
  }
}
