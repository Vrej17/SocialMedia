import clsx from "clsx";
import { useState } from "react";
import { postedUserType, RootState } from "../../dataTypes";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { base64, imageAvatar } from "../../constants/constnats";
export type PostsDescriptionTypes = {
  title: string;
  description: string;
  userInfo:postedUserType
};
export default function PostsDescriptions({
  title,
  description,
  userInfo
}: PostsDescriptionTypes) {
  const [openDescription, setOpenDescription] = useState(false);
  const navigate = useNavigate();
  const profileId = useSelector(
    (state: RootState) => state.myprofile.myprofile.id
  );
  const icon = userInfo.icon?.length > 0 ? userInfo.icon : imageAvatar;
  return (
    <>
      <div
        onClick={() => setOpenDescription((prev) => !prev)}
        className={clsx("flex flex-col cursor-pointer")}
      >
        <div
          onClick={() =>
            profileId === userInfo.id
              ? navigate("/account")
              : navigate(`/users/${userInfo.id}`)
          }
          className="flex cursor-pointer items-center gap-x-2"
        >
          <img
            className="rounded-full w-10 h-10"
            src={`${base64}${icon}`}
            alt="User Icon"
          />
          <h1 className="text-sm font-extrabold">{userInfo.username}</h1>
        </div>
        <h1
          className={clsx("font-bold transition-all duration-300 text-xl ml-2")}
        >
          {openDescription
            ? title
            : title.length > 20
            ? `${title.slice(0, 20)}...`
            : title}
        </h1>
        <p className=" transition-all duration-300 ml-3">
          {openDescription && description?.length !== 0 && description}
        </p>
      </div>
    </>
  );
}
