export interface IUser {
  name: string;
  email: string;
  lastLogin: number;
  created: number;
  ___class: string;
  ownerId: string;
  'user-token': string;
  objectId: string;
  avatar: string;
  about: string;
}
export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUserInput {
  name?: string;
  email?: string;
  avatarUrl?: string;
}
