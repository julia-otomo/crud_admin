import format from "pg-format";
import { IUserRequest, IUserResponse } from "../../interfaces/users.interfaces";
import { QueryResult } from "pg";
import { client } from "../../database";
import { responseUserSchema } from "../../schemas/users.schemas";
import { hashSync } from "bcryptjs";

const createUserService = async (
  requestBody: IUserRequest
): Promise<IUserResponse> => {
  const requestKeys: string[] = Object.keys(requestBody);

  requestBody.password = hashSync(requestBody.password, 10);

  const requestValues: Array<string | boolean | undefined> =
    Object.values(requestBody);

  const createQuery: string = `
        INSERT INTO
            users
            (%I)
        VALUES
            (%L)
        RETURNING *;
    `;

  const queryFormat: string = format(createQuery, requestKeys, requestValues);

  const queryResult: QueryResult<IUserResponse> = await client.query(
    queryFormat
  );

  const newUser = responseUserSchema.parse(queryResult.rows[0]);

  return newUser;
};

export default createUserService;
