import userSchema from "../model/user.model.js";
import { signToken } from "../utils/helper.util.js";
import { ConflictError, UnauthorizedError } from "../utils/errorHandler.util.js";

export const registerUserService = async (name, email, password) => {
  const existingUser = await userSchema.findOne({ email });
  if (existingUser) throw new ConflictError("User already exists");

  const newUser = new userSchema({ name, email, password });
  await newUser.save();

  const token = signToken({ id: newUser._id });
  return { user: newUser, token };
};

export const loginUserService = async (email, password) => {
  const user = await userSchema.findOne({ email });
  if (!user) throw new UnauthorizedError("Invalid email or password");

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new UnauthorizedError("Invalid email or password");

  const token = signToken({ id: user._id });
  return { user, token };
};

