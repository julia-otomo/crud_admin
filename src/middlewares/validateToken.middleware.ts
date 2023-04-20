import { NextFunction, Request, Response } from "express";
import AppError from "../error";
import { verify } from "jsonwebtoken";
import "dotenv/config";

const validateToken = (
  request: Request,
  response: Response,
  next: NextFunction
): void => {
  const authorization: string | undefined = request.headers.authorization;

  if (!authorization) {
    throw new AppError("Missing Bearer Token", 401);
  }

  const [_bearer, token] = authorization.split(" ");

  verify(token, String(process.env.SECRET_KEY), (error: any, decoded: any) => {
    if (error) {
      throw new AppError(error.message, 401);
    }

    response.locals.email = decoded.email;
    response.locals.id = decoded.id;
    response.locals.admin = decoded.admin;
  });

  return next();
};

export default validateToken;
