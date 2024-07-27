export interface IUser {
  name: string;
  email: string;
  lastLogin: number;
  created: number;
  ___class: string;
  ownerId: string;
  'user-token': string;
  objectId: string;
}

export interface GenericResponse {
  status: string;
  message: string;
  token: string | undefined;
  acsee?: boolean;
}

export interface ILoginResponse extends IUser {
  status: string;
  'user-token': string;
}

export interface IUserResponse extends IUser {
  status: string;
}
