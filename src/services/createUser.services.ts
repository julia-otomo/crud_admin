import format from "pg-format";
import { IUserRequest, IUserResponse } from "../interfaces/users.interfaces";
import { QueryResult } from "pg";
import { client } from "../database";

const createUserService = async (
  requestBody: IUserRequest
): Promise<IUserResponse> => {
  const requestKeys: string[] = Object.keys(requestBody);
  const requestValues: Array<string | boolean | undefined> =
    Object.values(requestBody);

  const createQuery: string = `
        INSERT INTO
            users
            (%I)
        VALUES
            (%L)
        RETURNING "id", "name", "email", "admin", "active";
    `;

  const queryFormat: string = format(createQuery, requestKeys, requestValues);

  const queryResult: QueryResult<IUserResponse> = await client.query(
    queryFormat
  );

  return queryResult.rows[0];
};

export default createUserService;
