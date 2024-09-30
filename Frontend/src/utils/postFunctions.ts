import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { postType } from "../dataTypes";
export function changeImgUrl({
  e,
  setImgUrl,
}: {
  e: ChangeEvent<HTMLInputElement>;
  setImgUrl: Dispatch<SetStateAction<string>>;
}) {
  const fileInput = e.target.files && e.target.files[0];
  if (fileInput) {
    const reader = new FileReader();
    reader.onload = ({ target }) => {
      if (target) {
        const image = target.result as string;
        setImgUrl(image.split(",")[1]);
      }
    };
    reader.readAsDataURL(fileInput);
  } else {
    setImgUrl(prev => prev);
  }
}
export type CreatePostType = {
  imgUrl: string;
  postForm: { title: string; description: string };
  setImgUrl: Dispatch<SetStateAction<string>>;
  setUserPosts: Dispatch<SetStateAction<postType[]>>;
  userId: string;
};
export async function createPost({
  imgUrl,
  setImgUrl,
  setUserPosts,
  userId,
  postForm,
}: CreatePostType) {
  try {
    const response = await fetch("/post/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image: imgUrl, userId, ...postForm }),
    });
    if (!response.ok) {
      return;
    }

    const data = await response.json();
 
    setUserPosts((prev) => [...prev, data]);
    setImgUrl("");
  } catch (error) {
    console.log(error);
  }
}
