import { Router } from "express";
import validateRequestBody from "../middlewares/validateBody.middleware";
import { requestUserSchema } from "../schemas/users.schemas";
import verifyEmail from "../middlewares/verifyEmail.middleware";
import { createUserController } from "../controllers/users.contollers";
import validateToken from "../middlewares/validateToken.middleware";

const userRoutes: Router = Router();

userRoutes.post(
  "",
  validateRequestBody(requestUserSchema),
  verifyEmail,
  createUserController
);

userRoutes.use(validateToken);

export default userRoutes;
