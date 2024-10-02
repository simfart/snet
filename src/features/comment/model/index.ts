import { IUser } from 'entities/user/model/userModel';

export type IComment = {
  user: IUser;
  text: string;
  created: number;
  objectId: string;
};
