import { Router } from "express";
import validateRequestBody from "../middlewares/validateBody.middleware";
import { loginUserSchema } from "../schemas/users.schemas";
import userLoginController from "../controllers/session.controllers";

const sessionRoutes: Router = Router();

sessionRoutes.post(
  "",
  validateRequestBody(loginUserSchema),
  userLoginController
);

export default sessionRoutes;
