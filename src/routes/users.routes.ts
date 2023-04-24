import { Router } from "express";
import validateRequestBody from "../middlewares/validateBody.middleware";
import { requestUserSchema } from "../schemas/users.schemas";
import verifyEmail from "../middlewares/verifyEmail.middleware";
import {
  activateUserController,
  createUserController,
  deleteUserController,
  getAllUsersController,
  getUserProfileCotroller,
  updateUserController,
} from "../controllers/users.contollers";
import validateToken from "../middlewares/validateToken.middleware";
import {
  verifyAdminStatus,
  verifyAdminStatusToUpdateAndDeleteUser,
} from "../middlewares/verifyAdminStatus.middleware";
import verifyId from "../middlewares/verifyId.middleware";
import { validateActivatedUserRecover } from "../middlewares/validateActivatedUser.middleware";

const userRoutes: Router = Router();

userRoutes.post(
  "",
  validateRequestBody(requestUserSchema),
  verifyEmail,
  createUserController
);

userRoutes.use(validateToken);

userRoutes.get("/profile", getUserProfileCotroller);

userRoutes.get("", verifyAdminStatus, getAllUsersController);

userRoutes.put(
  "/:id/recover",
  verifyId,
  verifyAdminStatus,
  validateActivatedUserRecover,
  activateUserController
);

userRoutes.patch(
  "/:id",
  validateRequestBody(requestUserSchema.partial()),
  verifyId,
  verifyAdminStatusToUpdateAndDeleteUser,
  updateUserController
);

userRoutes.delete(
  "/:id",
  verifyId,
  verifyAdminStatusToUpdateAndDeleteUser,
  deleteUserController
);

export default userRoutes;
