import { Dispatch, SetStateAction } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../dataTypes";

import { CloseCircleOutlined } from "@ant-design/icons";
import clsx from "clsx";

import { Link } from "react-router-dom";
import { base64, imageAvatar } from "../../../constants/constnats";

export function LikedPostUsers({
  openLikes,
  setOpenLikes,
}: {
  openLikes: boolean;
  setOpenLikes: Dispatch<SetStateAction<boolean>>;
}) {
  const userswhoLike = useSelector(
    (state: RootState) => state.posts.usersWhoLike
  );
  const profileId = useSelector(
    (state: RootState) => state.myprofile.myprofile.id
  );


  return (
    <div
      className={clsx(
        "absolute h-full w-full overflow-y-auto overflow-x-hidden transition-all duration-500 rounded-2xl p-2 flex flex-col items-center left-0 ",
        openLikes ? "top-0" : "top-[100%]"
      )}
    >
      <div className="flex gap-x-[300px] mobile-md:gap-x-60 mobile-sm:gap-x-32">
        <h1 className="text-base">Likes</h1>
        <CloseCircleOutlined
          className={clsx(
            "text-2xl",
            openLikes ? "rotate-[360deg] scale-125" : "rotate-[0deg] scale-100"
          )}
          onClick={() => setOpenLikes((prev) => !prev)}
        />
      </div>
      <div
        className={clsx(
          "border-slate-600 h-0 mt-2 border-opacity-30 rounded-full border-2",
          openLikes ? "w-full" : "w-1"
        )}
      ></div>
      <div className="flex items-start flex-col">
        {userswhoLike?.length !== 0 &&
          openLikes &&
          userswhoLike.map((user) => {
            const icon = user.icon?.length > 0 ? user.icon : imageAvatar;
            return (
              <Link
                key={user.id}
                to={user.id === profileId ? "/account" : `/users/${user.id}`}
                className="flex gap-x-2 p-2 pl-3 items-center"
              >
                <img
                  src={`${base64}${icon}`}
                  alt="Profile Icon"
                  className="w-7 h-7 rounded-full"
                ></img>
                <h2>{user.username}</h2>
              </Link>
            );
          })}
      </div>
    </div>
  );
}
