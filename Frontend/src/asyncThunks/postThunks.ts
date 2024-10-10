import { createAsyncThunk } from "@reduxjs/toolkit";
import { PostedUserType } from "../dataTypes";
import {
  setLoadingFalseAsync,
  setLoadingTrueAsync,
} from "../utils/loadFunctions";
import { store } from "..";

export const getPostsByThunk = createAsyncThunk(
  "posts/getting",
  async ({ userId }: { userId: string }, { rejectWithValue }) => {
    try {
      store.dispatch(setLoadingTrueAsync);

      const response = await fetch(`/post/get/${userId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message);
      }
      return data;
    } catch (error) {
      return rejectWithValue("Failed Getting Posts");
    } finally {
      store.dispatch(setLoadingFalseAsync);
    }
  }
);

export const getUsersWhoLike = createAsyncThunk(
  "/userswholike",
  async (postId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/post/userswholike/${postId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data: PostedUserType[] = await response.json();
      if (!response.ok) {
        return rejectWithValue("Please Try Again Later");
      }
      return data.length ? data : [];
    } catch (error) {
      return rejectWithValue("Please Try Again Late");
    }
  }
);
