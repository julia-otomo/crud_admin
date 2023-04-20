import { QueryConfig, QueryResult } from "pg";
import { IUserResponse } from "../../interfaces/users.interfaces";
import { IUser } from "../../interfaces/users.interfaces";
import { client } from "../../database";
import { responseUserSchema } from "../../schemas/users.schemas";

const getUserProfile = async (userId: number): Promise<IUserResponse> => {
  const searchUserProfile: string = `
        SELECT
            *
        FROM
            users
        WHERE
            id = $1;
    `;

  const queryConfig: QueryConfig = {
    text: searchUserProfile,
    values: [Number(userId)],
  };

  const queryResult: QueryResult<IUser> = await client.query(queryConfig);

  const foundUser = responseUserSchema.parse(queryResult.rows[0]);

  return foundUser;
};

export default getUserProfile;
