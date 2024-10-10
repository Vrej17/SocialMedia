import { Dispatch, SetStateAction } from "react";
import { store } from "..";
import { PostedUserType, PostType } from "../dataTypes";
import { setLoadingFalseAsync, setLoadingTrueAsync } from "./loadFunctions";

export const getUserAndPosts = async (
  userId: string,
  setUser: Dispatch<SetStateAction<PostedUserType>>,
  setIsUserMessage: Dispatch<SetStateAction<string>>,
  setUserPosts: Dispatch<SetStateAction<PostType[]>>
) => {
  store.dispatch(setLoadingTrueAsync);
  try {
    const response = await fetch(`/user/${userId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (!response.ok) {
      return setIsUserMessage(data.message);
    } else {
      setUser(data.user);
      setUserPosts(data.userPosts);
    }
  } catch (error: any) {
    return setIsUserMessage(error.message || "Internal Server Error");
  } finally {
    store.dispatch(setLoadingFalseAsync);
  }
};
export const getProfilePosts = async (userId: string) => {
  store.dispatch(setLoadingTrueAsync);
  try {
    const response = await fetch(`/post/user-posts/${userId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (!response.ok) {
      return [];
    }

    return data;
  } catch (error) {
  } finally {
    store.dispatch(setLoadingFalseAsync);
  }
};
