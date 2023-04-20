import { Request, Response } from "express";
import { IUserRequest, IUserResponse } from "../interfaces/users.interfaces";
import createUserService from "../services/users/createUser.services";

const createUserController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const requestBody: IUserRequest = request.body;

  const newUser: IUserResponse = await createUserService(requestBody);

  return response.status(201).json(newUser);
};

export { createUserController };
