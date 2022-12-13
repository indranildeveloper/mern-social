import jwt from "jsonwebtoken";
import { config } from "../config";

const generateToken = (userId) =>
  jwt.sign(
    {
      userId,
    },
    config.JWT_SECRET,
    {
      algorithm: "HS512",
      expiresIn: "30d",
    }
  );

export default generateToken;
