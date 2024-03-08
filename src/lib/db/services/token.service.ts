import jwt from "jsonwebtoken";

const AUTH_SECRET = process.env.AUTH_JWT as string;
const FORGET = process.env.FORGET_JWT as string;

export const generateToken = (id: string) => {
  return jwt.sign({ userId: id }, AUTH_SECRET, { expiresIn: "2d" });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, AUTH_SECRET);
};