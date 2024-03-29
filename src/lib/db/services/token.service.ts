import jwt, { JwtPayload } from "jsonwebtoken";

const AUTH_SECRET = process.env.AUTH_JWT as string;
const FORGET = process.env.FORGET_JWT as string;

export const generateToken = (id: string) => {
  return jwt.sign({ userId: id }, AUTH_SECRET, { expiresIn: "2d" });
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, AUTH_SECRET) as JwtPayload;
};
export const verifyForgetToken = (token: string, email: string): JwtPayload => {
  return jwt.verify(token, `${FORGET}+${email}`) as JwtPayload;
};

export const generateForgetToken = (id: string, email: string) => {
  return jwt.sign({ userId: id }, `${FORGET}+${email}`, {
    expiresIn: "1d",
  });
};
