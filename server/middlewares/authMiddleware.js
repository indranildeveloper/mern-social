import jwt from "jsonwebtoken";
import { expressjwt } from "express-jwt";
import asyncHandler from "express-async-handler";
import { User } from "../models";
import { config } from "../config";

const hasAuthorization = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get the token from header
      // eslint-disable-next-line prefer-destructuring
      token = req.headers.authorization.split(" ")[1];
      // Verify the token
      const decoded = jwt.verify(token, config.JWT_SECRET);
      // Get the user from token
      req.profile = await User.findById({ _id: decoded.userId }).select(
        "-password"
      );

      if (req.params.userId !== decoded.userId) {
        res.status(401);
        throw new Error("Not Authorized!");
      }

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not Authorized!");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not Authorized!");
  }
});

const requireLogin = expressjwt({
  secret: config.JWT_SECRET,
  algorithms: ["HS512"],
});

export default { hasAuthorization, requireLogin };
