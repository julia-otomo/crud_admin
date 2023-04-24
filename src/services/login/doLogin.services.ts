import { IToken, IUser, IUserLogin } from "../../interfaces/users.interfaces";
import { sign } from "jsonwebtoken";
import "dotenv/config";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../../database";

const loginUser = async (requestBody: IUserLogin): Promise<IToken> => {
  const userEmail: string = requestBody.email;

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

  const user: IUser = queryResult.rows[0];

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
