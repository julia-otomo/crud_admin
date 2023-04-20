import { QueryConfig, QueryResult } from "pg";
import {
  IToken,
  IUser,
  IUserLogin,
  IUserResponse,
} from "../../interfaces/users.interfaces";
import { client } from "../../database";
import AppError from "../../error";
import { compareSync } from "bcryptjs";
import { sign } from "jsonwebtoken";
import "dotenv/config";
import { log } from "console";

const loginUser = async (requestBody: IUserLogin): Promise<IToken> => {
  const userEmail: string = requestBody.email;
  const userPassword: string = requestBody.password;

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

  const user: IUserResponse = queryResult.rows[0];

  const token: string = sign(
    { admin: user.admin },
    String(process.env.SECRET_KEY),
    {
      expiresIn: process.env.EXPIRES_IN,
      subject: String(user.id),
    }
  );

  return { token };
};

export default loginUser;
