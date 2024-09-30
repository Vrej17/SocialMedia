import { postType, userType } from "../../dataTypes";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";

import { base64 } from "../../constants/constnats";
import ProfilePostOpened from "./ProfilePostOpened";
import clsx from "clsx";

export function ProfilePosts({
  userPosts,
  setUserPosts,
  userId,
  userInfo,
}: {
  userPosts: postType[];
  setUserPosts: Dispatch<SetStateAction<postType[]>>;
  userInfo: userType;
  userId: string;
  
}) {
  const [postMessage, setPostMessage] = useState("");
  const [isOpenedPostIndex, setOpenedPostIndex] = useState<null | number>(null);
  const [likesCountAndIsLikedByUser, setLikesCountAndIsLikedByUser] = useState([
    {
      countsOfLike: 0,
      isLikedByUser: false,
    },
  ]);
  const getUserPosts = useCallback(async () => {
    if (!userId) {
      return;
    }

    try {
      const response = await fetch(`/post/userPosts/${userId}`);
      if (!response.ok) {
        return setPostMessage("Have Not Posts");
      }

      const data = await response.json();
      setUserPosts(data.posts);
      setLikesCountAndIsLikedByUser(data.likes);
    } catch (error) {
      return;
    }
  }, [setUserPosts, setLikesCountAndIsLikedByUser, userId]);

  useEffect(() => {
    if (userId && userPosts?.length === 0 && !postMessage.length) {
      getUserPosts();
    }
  }, [getUserPosts, userPosts.length, userId, postMessage]);

  useEffect(() => {
    setLikesCountAndIsLikedByUser((prev) => [
      ...prev,
      { countsOfLike: 0, isLikedByUser: false },
    ]);
  }, [userPosts.length]);
  return (
    <div className="flex flex-col h-full w-full">
      {userPosts.length !== 0 ? (
        <div className="flex flex-wrap mt-2 gap-1 items-center ml-4 mobile:ml-0">
          {userPosts.map((post, index) => {
            return (
              <>
                <button
                  onClick={() => setOpenedPostIndex(index)}
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
                    <ProfilePostOpened
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
        <h1 className="text-center mt-2">{postMessage}</h1>
      )}
    </div>
  );
}
