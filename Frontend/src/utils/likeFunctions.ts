import { Dispatch, SetStateAction } from "react";
import { store } from "..";
import { addDisLikeAction, addLikeAction } from "../Slices/Slices";

export const addInPostLike = async (userAndPost: {
  userId: string;
  postId: string;
  index: number;
}) => {
  try {
    const { index, ...other } = userAndPost;
    const response = await fetch("/post/like", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...other }),
    });
    if (response.ok) {
      return store.dispatch(addLikeAction({ userId: other.userId, index }));
    }
  } catch (error) {
    console.log(error);
  }
};
export const addInPostDisLike = async (userAndPost: {
  userId: string;
  postId: string;
  index: number;
}) => {
  try {
    const { index, ...other } = userAndPost;

    const response = await fetch("/post/dislike", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...other }),
    });
    if (response.ok) {
      return store.dispatch(addDisLikeAction({ userId: other.userId, index }));
    }
  } catch (error) {
    console.log(error);
  }
};
export const addInProfileLike = async (userAndPost: {
  postId: string;
  userId: string;
  index: number;
  setLikesCountAndIsLikedByUser: Dispatch<
    SetStateAction<{ countsOfLike: number; isLikedByUser: boolean }[]>
  >;
}) => {
  try {
    const { index, setLikesCountAndIsLikedByUser, ...otherId } = userAndPost;
    const response = await fetch("/post/like", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...otherId }),
    });
    if (!response.ok) {
      return;
    }
    setLikesCountAndIsLikedByUser((prev) => {
      const updatedItems = [...prev];
      updatedItems[index] = {
        ...updatedItems[index],
        countsOfLike: updatedItems[index].countsOfLike + 1,
        isLikedByUser: true,
      };
      return updatedItems;
    });
  } catch (err) {}
};
export const addInProfileDisLike = async (userAndPost: {
  postId: string;
  userId: string;
  index: number;
  setLikesCountAndIsLikedByUser: Dispatch<
    SetStateAction<{ countsOfLike: number; isLikedByUser: boolean }[]>
  >;
}) => {
  try {
    const { index, setLikesCountAndIsLikedByUser, ...otherId } = userAndPost;
    const response = await fetch("/post/dislike", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...otherId }),
    });
    if (!response.ok) {
      return;
    }
    setLikesCountAndIsLikedByUser((prev) => {
      const updatedItems = [...prev];
      updatedItems[index] = {
        ...updatedItems[index],
        countsOfLike: updatedItems[index].countsOfLike - 1,
        isLikedByUser: false,
      };
      return updatedItems;
    });
  } catch (err) {}
};
