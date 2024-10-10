import { AppDispatch, PostType, RootState, UserType } from "../../dataTypes";
import {
  useEffect,
  useState,
} from "react";

import { base64 } from "../../constants/constnats";
import {PostOpenedProfile} from "./PostOpenedProfile";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import {
  setLoadingFalseAsync,
  setLoadingTrueAsync,
} from "../../utils/loadFunctions";

export function ProfilePosts({
  userPosts,
  userId,
  userInfo,
}: {
  userPosts: PostType[];
  userInfo: UserType;
  userId: string;
}) {
  
  const [isOpenedPostIndex, setOpenedPostIndex] = useState<null | number>(null);
  const [likesCountAndIsLikedByUser, setLikesCountAndIsLikedByUser] = useState([
    {
      countsOfLike: 0,
      isLikedByUser: false,
    },
  ]);
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.loading);

  const getUserPostsLikes = async (userId: string) => {
    dispatch(setLoadingTrueAsync);
    try {
      const response = await fetch(`/post/user-posts/likes/${userId}`);

      const data = await response.json();
      setLikesCountAndIsLikedByUser(data.likes);
    } catch (error) {
      return;
    } finally {
      dispatch(setLoadingFalseAsync);
    }
  };

  useEffect(() => {
    setLikesCountAndIsLikedByUser((prev) => [
      ...prev,
      { countsOfLike: 0, isLikedByUser: false },
    ]);
  }, [userPosts]);


  return (
    <div className="flex flex-col h-full w-full">
      {userPosts?.length !== 0 ? (
        <div className="flex flex-wrap mt-2 gap-1 items-center ml-4 mobile:ml-0">
          {userPosts?.map((post, index) => {
            return (
              <>
                <button
                  onClick={() =>
                    getUserPostsLikes(userId).then(() =>
                      setOpenedPostIndex(index)
                    )
                  }
                  className={clsx(
                    "w-[32%] mobile-md:w-52 h-40 border-2 border-slate-500 hover:scale-105 transition-all duration-300 min-w-auto rounded-lg mobile-md:mb-2 bg-slate-800"
                  )}
                >
                  <img
                    src={`${base64}${post.image}`}
                    alt="User Posts"
                    className="object-contain h-full w-full"
                  />
                </button>
                {isOpenedPostIndex === index && (
                  <>
                    <PostOpenedProfile
                      index={index}
                      postInfo={post}
                      userInfo={userInfo}
                      likes={likesCountAndIsLikedByUser[index]}
                      setOpenedPostIndex={setOpenedPostIndex}
                      setLikesCountAndIsLikedByUser={
                        setLikesCountAndIsLikedByUser
                      }
                    />
                  </>
                )}
              </>
            );
          })}
        </div>
      ) : (
        !loading && <h1 className="text-center mt-2">Don't Have Any Posts</h1>
      )}
    </div>
  );
}
