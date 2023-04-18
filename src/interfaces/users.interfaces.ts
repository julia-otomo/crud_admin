interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  admin: boolean;
  active: boolean;
}

type IUserCreate = Omit<IUser, "id">;
