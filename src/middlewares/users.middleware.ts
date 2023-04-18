import { Request, Response, NextFunction } from "express";
import AppError from "../error";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";

const verifyEmail = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const userEmail: string = request.body.email;

  const verifyQuery: string = `
    SELECT 
        *
    FROM
        users
    WHERE
        email = $1
  `;

  const queryConfig: QueryConfig = {
    text: verifyQuery,
    values: [userEmail],
  };

  const queryResult: QueryResult<IUser> = await client.query(queryConfig);

  if (queryResult.rowCount > 0) {
    throw new AppError("E-mail already registered", 409);
  }

  next();
};

export { verifyEmail };
