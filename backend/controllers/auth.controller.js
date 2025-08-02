import { BadRequestError } from "../utils/errorHandler.util.js";
import { registerUserService, loginUserService } from "../services/registerUser.service.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) throw new BadRequestError("All fields are required");

    const { user, token } = await registerUserService(name, email, password);

    res.cookie("accesstoken", token, { 
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 604800000,
    });

    res.status(201).json({
      success: true,
      user: { id: user._id, name: user.name, email: user.email },
      message: "User registered successfully",
    });
  } catch (err) {
    next(err);
  }
};


export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new BadRequestError("All fields are required");

    const { user, token } = await loginUserService(email, password);

    res.cookie("accesstoken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 604800000,
    });

    res.status(200).json({
      success: true,
      user: { id: user._id, name: user.name, email: user.email },
      message: "Logged in successfully",
    });
  } catch (err) {
    next(err);
  }
};
