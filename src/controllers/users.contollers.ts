import { Request, Response } from "express";
import { IUserRequest, IUserResponse } from "../interfaces/users.interfaces";
import createUserService from "../services/users/createUser.services";
import getUserProfile from "../services/users/getUserProfile. services";
import getAllUsers from "../services/users/getAllUsers.services";
import updateUser from "../services/users/updateUser.services";
import deleteUser from "../services/users/deleteUser.services";
import activateUser from "../services/users/activateUser.services";

const createUserController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const requestBody: IUserRequest = request.body;

  const newUser: IUserResponse = await createUserService(requestBody);

  return response.status(201).json(newUser);
};

const getUserProfileCotroller = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const userId: number = Number(response.locals.user.id);

  const foundUser: IUserResponse = await getUserProfile(userId);

  return response.json(foundUser);
};

const getAllUsersController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const users: IUserResponse[] = await getAllUsers();

  return response.json(users);
};

const updateUserController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const userId: number = Number(request.params.id);

  const requestBody: Partial<IUserRequest> = request.body;

  const updateUserReturn: IUserResponse = await updateUser(userId, requestBody);

  return response.json(updateUserReturn);
};

const deleteUserController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const userId: number = Number(request.params.id);

  await deleteUser(userId);

  return response.status(204).send();
};

const activateUserController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const userId: number = Number(request.params.id);

  const activatedUser: IUserResponse | void = await activateUser(userId);

  return response.json(activatedUser);
};

export {
  createUserController,
  getUserProfileCotroller,
  getAllUsersController,
  updateUserController,
  deleteUserController,
  activateUserController,
};
