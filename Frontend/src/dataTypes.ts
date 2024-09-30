import { store } from "./index";

export type AppDispatch = typeof store.dispatch;

export type postType = {
  id: string;
  title: string;
  description: string;
  image: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type likesType = {
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
export type userType = {
  id: string;
  username: string;
  bio: string;
  icon: string;
  token?: string;
  updatedAt: string;
  createdAt: string;
};

export type postedUserType = Omit<userType, "token" | "password">;
export type postsTypes = {
  posts: postType[];
  error: string;
  likes: likesType;
  users: postedUserType[];
  usersWhoLike: postedUserType[];
};
export type RootState = ReturnType<typeof store.getState>;
export type middlewares = { type: string; payload: any; meta?: any };
