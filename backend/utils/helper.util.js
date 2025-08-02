import { nanoid } from "nanoid";
import jsonWebToken from "jsonwebtoken";

export const generateNanoId = (length) => {
  return nanoid(length);
};

export const signToken = (payload) => {
  return jsonWebToken.sign(payload, process.env.JWT_SECRET, { expiresIn: "10m" });
};

export const verifyToken = (token) => {
  return jsonWebToken.verify(token, process.env.JWT_SECRET);
};
