import { verifyToken } from "../utils/helper.util.js";
import User from "../model/user.model.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.accesstoken;
  if (!token) return res.status(401).json({ message: "Unauthorized - No token" });

  try {
    const decoded = verifyToken(token);
    console.log("Decoded:", decoded);
    
    const user = await User.findById(decoded.id);
    console.log("user",user)
    
    if (!user) return res.status(401).json({ message: "Unauthorized - User not found" });
    req.user = user;
    console.log("req",req.user)
    next();
  } catch (error) {
    console.error("Auth error:", error);
    return res.status(401).json({ message: "Unauthorized", error: error.message });
  }
};
