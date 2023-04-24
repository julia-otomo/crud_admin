import { compareSync } from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";
import AppError from "../error";
import { IUser } from "../interfaces/users.interfaces";

const validateUserLogin = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const userEmail: string = request.body.email;
  const userPassword: string = request.body.password;

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
    throw new AppError("Wrong email/password", 401);
  }

  const validPassword: boolean = compareSync(
    userPassword,
    queryResult.rows[0].password
  );

  if (!validPassword) {
    throw new AppError("Wrong email/password", 401);
  }

  response.locals.userFound = queryResult.rows[0];

  next();
};

export default validateUserLogin;
