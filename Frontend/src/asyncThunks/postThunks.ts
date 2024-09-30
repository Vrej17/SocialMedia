import { createAsyncThunk } from "@reduxjs/toolkit";
import { postedUserType } from "../dataTypes";
import { setLoadingFalseAsync, setLoadingTrueAsync } from "../HelperFunctions";
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
        return rejectWithValue("Something Went Wrong Please Try Again");
      }
      if(data.length === 0) {
        return rejectWithValue("No posts");
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
      const data: postedUserType[] = await response.json();
      if (!response.ok) {
        return rejectWithValue("Please Try Again Later");
      }
      return data.length ? data : [];
    } catch (error) {
      return rejectWithValue("Please Try Again Late");
    }
  }
);
// export const getUsersByPosts = createAsyncThunk<
//   userType,
//   string,
//   { rejectValue: string }
// >("users/posts/getting", async (profileId: string, { rejectWithValue }) => {
//   // Dispatch actions to update loading state
//   store.dispatch(setLoadingTrueAsync);

//   try {
//     const response = await fetch(`/user/${profileId}`);

//     const userData = await response.json();
//     console.log(userData);
//     if (!response.ok) {
//       return rejectWithValue(userData.error as string);
//     }

//     return userData;
//   } catch (error) {
//     return rejectWithValue(`Network error: klir`);
//   } finally {
//     store.dispatch(setLoadingFalseAsync);
//   }
// });
