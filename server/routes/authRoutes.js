import express from "express";
import { authController } from "../controllers";
import { authMiddleware } from "../middlewares";

const router = express.Router();

router.route("/").post(authController.register);
router.route("/login").post(authController.login);
router
  .route("/logout")
  .get(authMiddleware.hasAuthorization, authController.logout);

export default router;
