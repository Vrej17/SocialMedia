import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { PostedUserType, PostType, RootState } from "../dataTypes";
import clsx from "clsx";
import { getUserAndPosts } from "../utils/userFunctions";
import { ArrowLeftOutlined } from "@ant-design/icons";

import { ProfilePosts } from "./Profile/ProfilePosts";
import { base64, imageAvatar } from "../constants/constnats";

export default function UserProfile() {
  const { userId = "" } = useParams();

  const [userPosts, setUserPosts] = useState<PostType[]>([]);
  const [isUserMessage, setIsUserMessage] = useState("");
  const [user, setUser] = useState<PostedUserType>({
    id: "",
    username: "",
    bio: "",
    icon: "",
    updatedAt: "",
    createdAt: "",
  });
  const navigate = useNavigate();
  const theme = useSelector((state: RootState) => state.theme);

  useEffect(() => {
    if (userId !== user.id) {
      getUserAndPosts(userId, setUser, setIsUserMessage, setUserPosts);
    }
  }, [userId,user.id]);

  return (
    <div
      className={clsx(
        "rounded-2xl font-primaryRegular w-[700px] mobile:w-[400px] mobile-md:w-64 p-6",
        theme ? "bg-slate-100" : "bg-black [&_*]:text-white"
      )}
    >
      <div className="w-full flex items-start">
        <ArrowLeftOutlined
          onClick={() => navigate("/posts")}
          className={clsx("text-lg", !theme && "text-slate-200")}
        />
      </div>
      {user ? (
        <>
          <img
            src={`${base64}${user.icon?.length > 0 ? user.icon : imageAvatar}`}
            className="rounded-full w-24 h-24"
            alt="icon"
          />
          <h1 className="font-primaryBold text-[30px]">{user.username}</h1>
          <h6>{user.bio}</h6>
          <div className="flex flex-col w-full">
            <div
              className={clsx(
                "border-slate-600 h-0 mt-2 border-opacity-30 rounded-full border-2 w-full"
              )}
            ></div>
            <ProfilePosts
              userInfo={user}
              userId={userId}
              userPosts={userPosts}
            ></ProfilePosts>
          </div>
        </>
      ) : (
        <h1>{isUserMessage && isUserMessage}</h1>
      )}
    </div>
  );
}
