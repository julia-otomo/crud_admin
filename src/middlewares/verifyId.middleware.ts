import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { IUser } from "../interfaces/users.interfaces";
import { client } from "../database";
import AppError from "../error";

const verifyId = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const userId: number = Number(request.params.id);

  const searchUser: string = `
    SELECT
        *
    FROM
        users
    WHERE
        id = $1;
  `;

  const queryConfig: QueryConfig = {
    text: searchUser,
    values: [userId],
  };

  const queryResult: QueryResult<IUser> = await client.query(queryConfig);

  if (queryResult.rowCount === 0) {
    throw new AppError("User not found", 404);
  }

  return next();
};

export default verifyId;
