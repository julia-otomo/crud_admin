import { NextFunction, Request, Response } from "express";
import AppError from "../error";

const verifyAdminStatus = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const userAdminStatus: boolean = response.locals.user.admin;

  if (!userAdminStatus) {
    throw new AppError("Insufficient Permission", 403);
  }

  next();
};

const verifyAdminStatusToUpdateAndDeleteUser = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const userAdminStatus: boolean = response.locals.user.admin;
  const reponseUserId: number = Number(response.locals.user.id);
  const userId: number = Number(request.params.id);

  if (reponseUserId !== userId && !userAdminStatus) {
    throw new AppError("Insufficient Permission", 403);
  }

  next();
};

export { verifyAdminStatus, verifyAdminStatusToUpdateAndDeleteUser };
