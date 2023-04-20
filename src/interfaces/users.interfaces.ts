import {
  loginUserSchema,
  requestUserSchema,
  responseUserSchema,
  userSchema,
} from "../schemas/users.schemas";

type IUser = Zod.infer<typeof userSchema>;

type IUserRequest = Zod.infer<typeof requestUserSchema>;

type IUserResponse = Zod.infer<typeof responseUserSchema>;

type IUserLogin = Zod.infer<typeof loginUserSchema>;

interface IToken {
  token: string;
}

export { IUser, IUserRequest, IUserResponse, IUserLogin, IToken };
