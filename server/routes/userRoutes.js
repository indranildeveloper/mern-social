import express from "express";
import { userController } from "../controllers";
import { authMiddleware } from "../middlewares";

const router = express.Router();

router
  .route("/")
  .get(authMiddleware.hasAuthorization, userController.listUsers);
router
  .route("/:userId")
  .get(authMiddleware.requireLogin, userController.readUserProfile)
  .put(authMiddleware.hasAuthorization, userController.updateUserProfile)
  .delete(authMiddleware.hasAuthorization, userController.deleteUserProfile);

router.param("userId", userController.getUserById);

export default router;
