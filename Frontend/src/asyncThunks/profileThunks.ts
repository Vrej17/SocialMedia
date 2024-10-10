import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  setLoadingFalseAsync,
  setLoadingTrueAsync,
} from "../utils/loadFunctions";
import { store } from "..";

export const createMyProfile = createAsyncThunk(
  "myprofile/create",
  async (form: { name: string; password: string }, { rejectWithValue }) => {
    try {
      store.dispatch(setLoadingTrueAsync);

      const response = await fetch("/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...form }),
      });
      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return rejectWithValue("internal Server Error");
    } finally {
      store.dispatch(setLoadingFalseAsync);
    }
  }
);
export const logInProfile = createAsyncThunk(
  "myprofile/log",
  async (form: { name: string; password: string }, { rejectWithValue }) => {
    try {
      store.dispatch(setLoadingTrueAsync);

      const response = await fetch("/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: localStorage.getItem("profile"), ...form }),
      });
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return rejectWithValue("Internal Server Error");
    } finally {
      store.dispatch(setLoadingFalseAsync);
    }
  }
);
export const getProfileByToken = createAsyncThunk(
  "get/Profile",
  async (_, { rejectWithValue }) => {
    try {
      store.dispatch(setLoadingTrueAsync);

      const response = await fetch("/user/profile", {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("profile")}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.message);
      }
      return data;
    } catch (error) {
      return rejectWithValue("Internal Server Error");
    } finally {
      store.dispatch(setLoadingFalseAsync);
    }
  }
);
export const updateUser = createAsyncThunk(
  "update/user",
  async (
    form: { username: string; bio: string; icon: string; userId: string },
    { rejectWithValue }
  ) => {
    store.dispatch(setLoadingTrueAsync);
    try {
      const { userId, ...profileChanges } = form;
      const response = await fetch(`/user/update/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...profileChanges }),
      });
      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message);
      }

      return { ...profileChanges };
    } catch (error) {
      return rejectWithValue("Internal Server Error");
    } finally {
      store.dispatch(setLoadingFalseAsync);
    }
  }
);
