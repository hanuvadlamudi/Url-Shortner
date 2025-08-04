import express from "express";
import { authMiddleware } from "../middlewares/authorize.middleware.js";
import { getAllUserUrls } from "../controllers/user.controller.js";


const router = express.Router();

router.get("/urls",authMiddleware,getAllUserUrls)
export default router