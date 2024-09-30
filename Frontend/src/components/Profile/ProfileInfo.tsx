import { ArrowLeftOutlined } from "@ant-design/icons";
import clsx from "clsx";

import { useSelector } from "react-redux";
import { RootState } from "../../dataTypes";
import { useNavigate } from "react-router-dom";

import { base64, imageAvatar } from "../../constants/constnats";

export default function ProfileInfo() {
  const theme = useSelector((state: RootState) => state.theme);
  const navigate = useNavigate();
  const profile = useSelector((state: RootState) => state.myprofile.myprofile);
  const icon = profile.icon?.length > 0 ? profile.icon : imageAvatar;

  return (
    <>
      <span className="w-full flex items-center justify-between">
        <ArrowLeftOutlined
          onClick={() => navigate("/posts")}
          className={clsx(
            "text-[27px] hover:scale-110 transition-all duration-300",
            !theme && "text-slate-200"
          )}
        />
      </span>

      <div>
        <img
          src={`${base64}${icon}`}
          className="rounded-full w-24 h-24 object-cover"
          alt="icon"
        />
      </div>
      <div>
        <h1 className="text-2xl font-bold ml-2">{profile.username}</h1>
        <p className="text-base text-gray-500">{profile.bio}</p>
      </div>
    </>
  );
}
