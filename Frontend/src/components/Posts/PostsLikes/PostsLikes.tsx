import { Dispatch, SetStateAction } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../dataTypes";
import { PostsLikesCountAndHeart } from "./PostsLikesCount";
import { addInPostDisLike, addInPostLike } from "../../../utils/likeFunctions";
import { getUsersWhoLike } from "../../../asyncThunks/postThunks";

type PostsLikesTypes = {
  index: number;
  userId: string;
  postId: string;
  setOpenLikes: Dispatch<SetStateAction<boolean>>;
};
export default function PostsLikes({
  index,
  userId,
  postId,
  setOpenLikes,
}: PostsLikesTypes) {
  const likes = useSelector((state: RootState) => state.posts.likes[index]);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="flex gap-8 p-1 justify-center items-center">
      <PostsLikesCountAndHeart
        getUsersWhoLike={() => {
          dispatch(getUsersWhoLike(postId));
          setOpenLikes((prev) => !prev);
        }}
        addLike={() => {
          addInPostLike({ userId, postId, index });
        }}
        addDislike={() => {
          addInPostDisLike({ userId, postId, index });
        }}
        likes={likes}
      />
    </div>
  );
}
