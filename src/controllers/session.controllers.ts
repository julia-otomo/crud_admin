import { Request, Response } from "express";
import { IToken } from "../interfaces/users.interfaces";
import loginUser from "../services/login/doLogin.services";

const userLoginController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const token: IToken = await loginUser(request.body);

  return response.json({ token });
};

export default userLoginController;
