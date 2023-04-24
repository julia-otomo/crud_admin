import { Router } from "express";
import validateRequestBody from "../middlewares/validateBody.middleware";
import { loginUserSchema } from "../schemas/users.schemas";
import userLoginController from "../controllers/session.controllers";

import { validateActivatedUserLogin } from "../middlewares/validateActivatedUser.middleware";
import validateUserLogin from "../middlewares/validateUserLogin.middleware";

const sessionRoutes: Router = Router();

sessionRoutes.post(
  "",
  validateRequestBody(loginUserSchema),
  validateUserLogin,
  validateActivatedUserLogin,
  userLoginController
);

export default sessionRoutes;
