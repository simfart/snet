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
};

export interface CreatePostInput {
  title: string;
  content: string;
}

export interface UpdatePostInput {
  title?: string;
  content?: string;
}
