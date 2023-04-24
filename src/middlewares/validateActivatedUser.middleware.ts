import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";
import { IUser } from "../interfaces/users.interfaces";
import AppError from "../error";

const validateActivatedUserLogin = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const userEmail: string = request.body.email;

  const findUser: string = `
    SELECT 
        *
    FROM  
        users
    WHERE
        email = $1;
  `;

  const queryConfig: QueryConfig = {
    text: findUser,
    values: [userEmail],
  };

  const queryResult: QueryResult<IUser> = await client.query(queryConfig);

  if (queryResult.rowCount === 0) {
    throw new AppError("User not found", 404);
  }

  if (!queryResult.rows[0].active) {
    throw new AppError("Wrong email/password", 401);
  }

  next();
};

const validateActivatedUserRecover = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const userId: number = Number(request.params.id);

  const findUser: string = `
    SELECT 
        *
    FROM  
        users
    WHERE
        id = $1;
  `;

  const queryConfig: QueryConfig = {
    text: findUser,
    values: [userId],
  };

  const queryResult: QueryResult<IUser> = await client.query(queryConfig);

  if (queryResult.rowCount === 0) {
    throw new AppError("User not found", 404);
  }

  if (queryResult.rows[0].active) {
    throw new AppError("User already active", 400);
  }

  next();
};

export { validateActivatedUserLogin, validateActivatedUserRecover };
