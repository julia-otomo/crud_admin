import { requestUserSchema } from "../schemas/users.schemas";

interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  admin: boolean;
  active: boolean;
}

type IUserRequest = Zod.infer<typeof requestUserSchema>;

type IUserResponse = Omit<IUser, "password">;

export { IUser, IUserRequest, IUserResponse };
