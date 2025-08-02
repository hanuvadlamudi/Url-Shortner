import { verifyToken } from "../utils/helper.util.js";

export const authorizeMiddleware = (req, res, next) => {
  const token = req.cookies.accesstoken; 

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = verifyToken(token); 
    req.user = decoded; 
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
