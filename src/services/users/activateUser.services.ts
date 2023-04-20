import { QueryConfig, QueryResult } from "pg";
import { client } from "../../database";
import { IUserResponse } from "../../interfaces/users.interfaces";
import { responseUserSchema } from "../../schemas/users.schemas";
import AppError from "../../error";

const activateUser = async (userId: number): Promise<IUserResponse | void> => {
  const userProfile: string = `
    SELECT
        *
    FROM
        users
    WHERE
        id = $1;
    `;

  const queryConfigUser: QueryConfig = {
    text: userProfile,
    values: [userId],
  };

  const queryResultUser: QueryResult<IUserResponse> = await client.query(
    queryConfigUser
  );

  if (queryResultUser.rows[0].active === true) {
    throw new AppError("User already active", 400);
  }

  const softDeleteQuery: string = `
    UPDATE 
        users
    SET
        ("active") = ROW(true)
    WHERE
        id = $1
    RETURNING *;
    `;

  const queryConfig: QueryConfig = {
    text: softDeleteQuery,
    values: [userId],
  };

  const queryResult: QueryResult<IUserResponse> = await client.query(
    queryConfig
  );

  const user: IUserResponse = responseUserSchema.parse(queryResult.rows[0]);

  return user;
};

export default activateUser;
