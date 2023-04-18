import { Router } from "express";
import validateRequestBody from "../middlewares/validateBody.middleware";
import { requestUserSchema } from "../schemas/users.schemas";
import verifyEmail from "../middlewares/verifyEmail.middleware";
import createUserService from "../services/createUser.services";
import { createUserController } from "../controllers/users.contollers";

const userRoutes: Router = Router();

userRoutes.post(
  "",
  validateRequestBody(requestUserSchema),
  verifyEmail,
  createUserController
);

export default userRoutes;
