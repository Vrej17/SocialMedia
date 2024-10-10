import { store } from "./index";

export type AppDispatch = typeof store.dispatch;

export type PostType = {
  id: string;
  title: string;
  description: string;
  image: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type LikesType = {
  countsOfLike: number;
  isLikedByUser: boolean;
}[];
export type Photos = {
  id: number;
  albumId: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}[];
export type UserType = {
  id: string;
  username: string;
  bio: string;
  icon: string;
  token?: string;
  updatedAt: string;
  createdAt: string;
};

export type PostedUserType = Omit<UserType, "token" | "password">;
export type PostsTypes = {
  posts: PostType[];
  postsErrMessage: string;
  likes: LikesType;
  users: PostedUserType[];
  usersWhoLike: PostedUserType[];
};
export type RootState = ReturnType<typeof store.getState>;

