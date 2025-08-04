import express from "express";
import { createShortUrl, customUrl } from "../controllers/shortUrl.controller.js";
import { authMiddleware } from "../middlewares/authorize.middleware.js";


const router = express.Router();

// For logged-in users
router.post("/user", authMiddleware, createShortUrl);
router.post("/custom", authMiddleware, customUrl); 


// For guests
router.post("/", createShortUrl);

export default router;
