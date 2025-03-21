import AuthService from "../services/auth.service.js";

class AuthController {
  constructor() {
    this.auth_service = new AuthService();
  }
}
