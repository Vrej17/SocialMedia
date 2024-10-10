import { Dispatch, SetStateAction, useState } from "react";
import { base64 } from "../../constants/constnats";
import {
  addInProfileDisLike,
  addInProfileLike,
} from "../../utils/likeFunctions";
import { LikeCount } from "../Posts/Likes/LikeCount";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, PostType, RootState, UserType } from "../../dataTypes";
import { getUsersWhoLike } from "../../asyncThunks/postThunks";
import { Descriptions } from "../Posts/Description";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { LikedPostUsers } from "../Posts/Likes/LikedPostUsers";

import clsx from "clsx";
export function PostOpenedProfile({
  postInfo,
  index,
  setLikesCountAndIsLikedByUser,
  setOpenedPostIndex,
  likes,
  userInfo,
}: {
  userInfo: UserType;
  postInfo: PostType;
  likes: { countsOfLike: number; isLikedByUser: boolean };
  setLikesCountAndIsLikedByUser: Dispatch<
    SetStateAction<{ countsOfLike: number; isLikedByUser: boolean }[]>
  >;
  index: number;
  setOpenedPostIndex: Dispatch<SetStateAction<null | number>>;
}) {

  
  const profile = useSelector((state: RootState) => state.myprofile.myprofile);
  const theme = useSelector((state: RootState) => state.theme);
  const [openLikes, setOpenLikes] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div
      id="profilePostOpened"
      onClick={({ target }) => {
        if ((target as HTMLDivElement).id === "profilePostOpened") {
          setOpenedPostIndex(null);
        }
      }}
      className="fixed top-0 left-0 w-full min-h-screen bg-opacity-60 flex items-center z-[12] bg-black justify-center"
    >
      <button
        onClick={() => setOpenedPostIndex(null)}
        className="absolute top-24 left-10 text-white"
      >
        <ArrowLeftOutlined className="text-white top-2 mr-2" />
        Back
      </button>
      <div
        className={clsx(
          "rounded-2xl flex flex-col shadow-2xl [&_*]:transition-all w-96 mobile-md:w-[350px] mobile-sm:w-56 [&_*]:duration-1000 relative top-10 overflow-hidden",
          theme
            ? "[&_*]:bg-white [&_*]:text-black"
            : "[&_*]:bg-black [&_*]:text-white"
        )}
      >
        <img
          src={`${base64}${postInfo.image}`}
          alt="User Posts"
          className="max-h-[300px] object-contain"
        />
        <div className="flex flex-col gap-x-3 p-3">
          <div className="flex">
            <Descriptions
              title={postInfo.title}
              description={postInfo.description}
              userInfo={userInfo}
            />
          </div>
          <div className="flex gap-8 p-1 justify-center items-center">
            <LikeCount
              addLike={() => {
                addInProfileLike({
                  index,
                  userId: profile.id,
                  postId: postInfo.id,
                  setLikesCountAndIsLikedByUser,
                });
              }}
              addDislike={() => {
                addInProfileDisLike({
                  index,
                  userId: profile.id,
                  postId: postInfo.id,
                  setLikesCountAndIsLikedByUser,
                });
              }}
              likes={likes}
              getUsersWhoLike={() => {
                dispatch(getUsersWhoLike(postInfo.id));
                setOpenLikes(true);
              }}
            />
          </div>
          <LikedPostUsers openLikes={openLikes} setOpenLikes={setOpenLikes} />
        </div>
      </div>
    </div>
  );
}
