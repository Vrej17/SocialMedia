import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { postedUserType, postType, RootState } from "../dataTypes";
import clsx from "clsx";
import { getUser } from "../utils/userFunctions";
import { ArrowLeftOutlined } from "@ant-design/icons";

import { ProfilePosts } from "./Profile/ProfilePosts";
import { base64 } from "../constants/constnats";
export default function UserProfile() {
  const { userId = "" } = useParams();
  const usersWhoLike = useSelector(
    (state: RootState) => state.posts.usersWhoLike
  );
  const [userPosts, setUserPosts] = useState<postType[]>([]);

  const [user, setUser] = useState<postedUserType>({
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
    if (!user.id) {
      const findedUser =
        usersWhoLike.find((user) => user.id === userId) || null;
      if (!findedUser) {
        getUser(userId).then((userByFetch) => {
          if (userByFetch) {
            setUser(userByFetch);
          }
        });
      } else if (findedUser) {
        setUser(findedUser);
      }
    }
  }, [userId, userPosts.length, user, usersWhoLike]);



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
      {user && (
        <>
          <img
            src={`${base64}${user.icon}`}
            className="rounded-full w-24 h-24"
            alt="icon"
          />
          <h1 className="font-primaryBold text-[30px]">{user.username}</h1>
          <h6>{user.bio}</h6>
        </>
      )}
      <div className="flex flex-col w-full">
        <div
          className={clsx(
            "border-slate-600 h-0 mt-2 border-opacity-30 rounded-full border-2 w-full"
          )}
        ></div>
        <ProfilePosts
          userInfo={user}
          userId={userId}
          setUserPosts={setUserPosts}
          userPosts={userPosts}
        ></ProfilePosts>
      </div>
    </div>
  );
}
