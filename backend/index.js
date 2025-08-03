import express from "express";
import { nanoid } from "nanoid";
import { configDotenv } from "dotenv";
import connectDB from "./mongo.config.js";
import router from "./routes/shortUrl.route.js";
import auth_routes from "./routes/auth.route.js";
import { redirectFromShortUrl } from "./controllers/shortUrl.controller.js";
import { errorHandler } from "./utils/errorHandler.util.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
configDotenv();
app.use(cookieParser());
app.use(cors({
  origin: true,  // Reflects the request origin (allows all, but safer than '*')
  credentials: true  // Enables cookies to be sent/received
}));

app.use(express.json());

app.listen(8080, () => {
    connectDB();
    console.log("hello http://localhost:8080");
});

app.use("/api/create",router);
app.use("/api/auth", auth_routes);


app.get("/:id",redirectFromShortUrl);

app.use(errorHandler)

