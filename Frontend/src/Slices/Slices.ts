import { createSlice } from "@reduxjs/toolkit";
import {
  createMyProfile,
  getProfileByToken,
  logInProfile,
  updateUser,
} from "../asyncThunks/profileThunks";
import { getPostsByThunk, getUsersWhoLike } from "../asyncThunks/postThunks";
import { PostsTypes } from "../dataTypes";

const loading = createSlice({
  name: "loading",
  initialState: false,
  reducers: {
    setLoading: (state, action) => (state = action.payload),
  },
});
const initialProfile = {
  myprofile: {
    id: "",
    username: "",
    bio: "",
    icon: "",
    token: "",
    updatedAt: "",
    createdAt: "",
  },
  profileErrMessage: "",
};

const myprofile = createSlice({
  name: "myprofile",
  initialState: initialProfile,

  reducers: {
    removeProfileErrMessage(state) {
      state.profileErrMessage = "";
    },
    logOut(state) {
      state.myprofile = initialProfile.myprofile;
      localStorage.clear();
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createMyProfile.fulfilled, (state, action) => {
        const { payload } = action;

        state.myprofile = { ...payload.other, token: payload.token };
      })
      .addCase(createMyProfile.rejected, (state, action) => {
        state.profileErrMessage = action.payload as string;
      })
      .addCase(logInProfile.fulfilled, (state, action) => {
        const { payload } = action;
        state.myprofile = { ...payload.other, token: payload.token };
      })
      .addCase(logInProfile.rejected, (state, action) => {
        state.profileErrMessage = action.payload as string;
      })

      .addCase(getProfileByToken.rejected, (state, action) => {
        state.profileErrMessage = action.payload as string;

        localStorage.clear();
      })
      .addCase(getProfileByToken.fulfilled, (state, action) => {
        const { payload } = action;
        state.myprofile = payload;
      })

      .addCase(updateUser.fulfilled, (state, action) => {
        state.myprofile.bio = action.payload.bio;
        state.myprofile.username = action.payload.username;
        state.myprofile.icon = action.payload.icon;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.profileErrMessage = action.payload as string;
      });
  },
});
const posts = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    postsErrMessage: "",
    likes: [],
    users: [],
    usersWhoLike: [],
  } as PostsTypes,
  reducers: {
    removePostError(state) {
      state.postsErrMessage = "";
    },
    addDisLikeAction(state, action) {
      const { index } = action.payload;
      state.likes[index].countsOfLike -= 1;
      state.likes[index].isLikedByUser = false;
    },
    addLikeAction(state, action) {
      const { index } = action.payload;
      state.likes[index].countsOfLike += 1;
      state.likes[index].isLikedByUser = true;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getPostsByThunk.fulfilled, (state, action) => {
        state.likes = action.payload.likes;
        state.posts = action.payload.posts;
        state.users = action.payload.users;
      })
      .addCase(getPostsByThunk.rejected, (state, action) => {
        state.postsErrMessage = action.payload as string;
      })
      .addCase(getUsersWhoLike.rejected, (state, action) => {
        state.postsErrMessage = action.payload as string;
      })
      .addCase(getUsersWhoLike.fulfilled, (state, action) => {
        state.usersWhoLike = action.payload;
      });
  },
});

const theme = createSlice({
  name: "theme",
  initialState: true,
  reducers: {
    changeTheme(state) {
      return !state;
    },
  },
});
export const Reducers = {
  posts: posts.reducer,
  loading: loading.reducer,
  theme: theme.reducer,
  myprofile: myprofile.reducer,
};

export const { setLoading } = loading.actions;
export const { changeTheme } = theme.actions;
export const {
  addLikeAction,
  addDisLikeAction,
  removePostError,
} = posts.actions;
export const { removeProfileErrMessage, logOut } = myprofile.actions;
