import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../dataTypes";
import { getPostsByThunk } from "../../asyncThunks/postThunks";

import { removePostError } from "../../Slices/Slices";
import { Post } from "./Post";

import { useNavigate } from "react-router-dom";
import ErrMessage from "../Profile/ErrMessage";



export const Posts: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector((state: RootState) => state.posts.posts);
  const postsErrMessage = useSelector(
    (state: RootState) => state.posts.postsErrMessage
  );
  const profileId = useSelector(
    (state: RootState) => state.myprofile.myprofile.id
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (profileId && !postsErrMessage.length) {
      dispatch(getPostsByThunk({ userId: profileId }));
    }
  }, [profileId, postsErrMessage,dispatch]);

  return (
    <main className="flex flex-col items-center break-words">
      {posts?.length > 0 &&
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

      <ErrMessage
        errMessage={postsErrMessage}
        deleteMessage={() => {
          dispatch(removePostError());
          navigate("/account");
        }}
      />
    </main>
  );
};
