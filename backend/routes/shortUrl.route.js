import express from "express";
import { createShortUrl, customUrl } from "../controllers/shortUrl.controller.js";
import { authorizeMiddleware } from "../middlewares/authorize.middleware.js";


const router = express.Router();

// For logged-in users
router.post("/user", authorizeMiddleware, createShortUrl);
router.post("/custom", authorizeMiddleware, customUrl); 


// For guests
router.post("/", createShortUrl);

export default router;
