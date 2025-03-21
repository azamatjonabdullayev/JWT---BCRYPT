import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";

const authRoutes = Router();
const authController = new AuthController();

authRoutes.post("/register", (req, res) => {
  authController.userRegister(req, res);
});

authRoutes.post("/login", (req, res) => {
  authController.userLogin(req, res);
});

export default authRoutes;
