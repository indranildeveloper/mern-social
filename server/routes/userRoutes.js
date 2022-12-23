import express from "express";
import { userController } from "../controllers";
import { authMiddleware } from "../middlewares";

const router = express.Router();

router
  .route("/photo/:userId")
  .get(userController.profilePhoto, userController.defaultPhoto);

router.route("/defaultphoto").get(userController.defaultPhoto);

router.route("/").get(authMiddleware.requireLogin, userController.listUsers);
router
  .route("/:userId")
  .get(authMiddleware.requireLogin, userController.readUserProfile)
  .put(authMiddleware.hasAuthorization, userController.updateUserProfile)
  .delete(authMiddleware.hasAuthorization, userController.deleteUserProfile);

router.param("userId", userController.getUserById);

export default router;
