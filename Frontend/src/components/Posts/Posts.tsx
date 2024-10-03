import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../dataTypes";
import { getPostsByThunk } from "../../asyncThunks/postThunks";
import { CloseOutlined } from "@ant-design/icons";

import { removePostError } from "../../Slices/Slices";
import Post from "./Post";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
export const Posts: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector((state: RootState) => state.posts.posts);
  const postError = useSelector((state: RootState) => state.posts.error);
  const profileId = useSelector(
    (state: RootState) => state.myprofile.myprofile.id
  );
  const navigate = useNavigate();

  
  useEffect(() => {
    if (postError?.length) {
      const timer = setTimeout(() => {
        dispatch(removePostError());
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [postError, dispatch]);
  
  useEffect(() => {
    if (!posts?.length && profileId) {
      dispatch(getPostsByThunk({ userId: profileId }));
    } else {
      return;
    }
  }, [posts, dispatch, profileId]);
  
  
  
  return (
    <main className="flex flex-col items-center break-words">
      {posts?.length !== 0 &&
        posts?.map((element, index) => {
          return (
            <Post
              index={index}
              postId={element.id}
              key={element.id}
              title={element.title}
              image={element.image}
              description={element.description}
            ></Post>
          );
        })}

      {postError?.length !== 0 && (
        <div
          className={clsx(
            "flex fixed bg-red-600 opacity-90 rounded-xl transition-all duration-400 top-32 w-52"
          )}
        >
          <h1 className="text-base p-3">{postError || "No posts"}</h1>
          <div className="ml-auto p-2">
            <CloseOutlined
              onClick={() => (
                dispatch(removePostError()), navigate("/account")
              )}
            />
          </div>
        </div>
      )}
    </main>
  );
};
