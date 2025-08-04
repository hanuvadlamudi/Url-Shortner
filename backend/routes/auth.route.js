import express from "express";
import { register, login,getCurrentUser } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/authorize.middleware.js";
import { logout } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout",authMiddleware,logout);
router.get("/current",authMiddleware,getCurrentUser);

export default router; 
