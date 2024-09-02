import { IUser } from 'entities/user/model/userModel';

export type IPost = {
  created: number;
  description: string;
  image?: string;
  objectId: string;
  ownerId?: number;
  updated?: number;
  likesCount?: number;
  comments?: number;
  likes: IUser[];
  user: IUser;
};
