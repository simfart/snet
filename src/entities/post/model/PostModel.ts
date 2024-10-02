import { ITag } from 'entities/tag/model/TagModel';
import { IUser } from 'entities/user/model/userModel';
import { IComment } from 'features/comment/model';

export type IPost = {
  created: number;
  description: string;
  image?: string;
  objectId: string;
  ownerId?: number;
  updated?: number;
  likesCount?: number;
  comments: IComment[];
  likes: IUser[];
  user: IUser;
  tags?: ITag[];
};
