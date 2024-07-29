export type Post = {
  created: number;
  description: string;
  image?: string;
  objectId: string;
  ownerId?: number;
  updated?: number;
  likesCount?: number;
  comments?: number;
};
