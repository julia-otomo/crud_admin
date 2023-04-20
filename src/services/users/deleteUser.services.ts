import { QueryConfig } from "pg";
import { client } from "../../database";

const deleteUser = async (userId: number): Promise<void> => {
  const softDeleteQuery: string = `
    UPDATE 
        users
    SET
        ("active") = ROW(false)
    WHERE
        id = $1;
    `;

  const queryConfig: QueryConfig = {
    text: softDeleteQuery,
    values: [userId],
  };

  await client.query(queryConfig);
};

export default deleteUser;
