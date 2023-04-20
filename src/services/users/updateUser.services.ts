import format from "pg-format";
import { IUserRequest, IUserResponse } from "../../interfaces/users.interfaces";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../../database";
import { responseUserSchema } from "../../schemas/users.schemas";

const updateUser = async (
  userId: number,
  requestBody: Partial<IUserRequest>
): Promise<IUserResponse> => {
  const requestKeys: string[] = Object.keys(requestBody);
  const requestValues: Array<string | boolean | undefined> =
    Object.values(requestBody);

  const updateQuery: string = ` 
        UPDATE 
            users
        SET
            (%I) = ROW(%L)
        WHERE
            id = $1
        RETURNING *;
    `;

  const queryFormat: string = format(updateQuery, requestKeys, requestValues);

  const queryConfig: QueryConfig = {
    text: queryFormat,
    values: [userId],
  };

  const queryResult: QueryResult<IUserResponse> = await client.query(
    queryConfig
  );

  const user: IUserResponse = responseUserSchema.parse(queryResult.rows[0]);

  return user;
};

export default updateUser;
