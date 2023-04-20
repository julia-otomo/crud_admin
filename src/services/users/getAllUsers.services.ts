import { QueryResult } from "pg";
import { IUserResponse } from "../../interfaces/users.interfaces";
import { client } from "../../database";
import { responseUserSchema } from "../../schemas/users.schemas";

const getAllUsers = async (): Promise<IUserResponse[]> => {
  const retrieveUsersQuery: string = `
        SELECT
            *
        FROM
            users;
    `;

  const queryResult: QueryResult<IUserResponse> = await client.query(
    retrieveUsersQuery
  );

  const users = queryResult.rows.map((user) => responseUserSchema.parse(user));

  return users;
};

export default getAllUsers;
