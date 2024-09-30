import { IPost } from 'entities/post/model/PostModel';
import { IUser } from 'entities/user/model/userModel';

export type IComment = {
  user: IUser;
  post: IPost;
  text: string;
};
