import { QueryConfig, QueryResult } from "pg";
import { client } from "../../database";
import { IUserResponse } from "../../interfaces/users.interfaces";
import { responseUserSchema } from "../../schemas/users.schemas";
import AppError from "../../error";

const activateUser = async (userId: number): Promise<IUserResponse | void> => {
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
