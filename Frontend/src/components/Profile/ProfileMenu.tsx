import { MenuOutlined, PlusOutlined } from "@ant-design/icons";
import clsx from "clsx";
import React, { useState } from "react";
import { changeImgUrl } from "../../utils/postFunctions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../dataTypes";
import { UserOutlined } from "@ant-design/icons";
import { Switch } from "antd";
import { changeTheme, logOut } from "../../Slices/Slices";

export default function ProfileMenu({
  setImgUrl,
  setIsChangeProfile,
}: {
  setImgUrl: React.Dispatch<React.SetStateAction<string>>;
  setIsChangeProfile: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const theme = useSelector((state: RootState) => state.theme);
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className={clsx(theme ? "bg-slate-100" : "bg-slate-900")}>
      <MenuOutlined
        onClick={() => setShowMenu(!showMenu)}
        className={clsx(
          "text-[30px] absolute right-10 z-[11] hover:scale-110 transition-all duration-700",
          showMenu ? "rotate-0" : "rotate-90",
          theme ? "text-black" : "text-white"
        )}
      />
      <menu
        className={clsx(
          "absolute w-1/2 z-10 flex flex-col items-end bg-inherit transition-[left] duration-700 pt-10 h-full",
          showMenu ? "left-1/2" : "left-[1000px]",
        )}
      >
        {" "}
        <div
          className={clsx(
            "border-slate-600 h-0 border-opacity-30 mb-2 rounded-full border-2 w-full"
          )}
        ></div>
        <span className="flex flex-col pr-2 [&_*]:text-[20px] gap-2 [&_*]:mobile:text-[15px]">
          <label
            onClick={() => {
              setShowMenu(false);
            }}
            htmlFor="fileInput"
            className={clsx(
              "cursor-pointer hover:opacity-65 flex items-center justify-end gap-x-1 pr-2 rounded-md bg-transparent"
            )}
          >
            <span>Add Post</span>
            <span>
              <PlusOutlined></PlusOutlined>
            </span>
            <input
              onChange={(e) => changeImgUrl({ e, setImgUrl })}
              type="file"
              hidden
              id="fileInput"
            />
          </label>
          <button
            onClick={async () => {
              setShowMenu(false);
              setTimeout(() => setIsChangeProfile(true), 500);
            }}
            className="flex items-center justify-end cursor-pointer gap-x-1 pr-2 w-full hover:opacity-65"
          >
            <span>Edit Profile</span>
            <span>
              <UserOutlined className="block" />
            </span>
          </button>
          <button
            onClick={() => {
              dispatch(logOut());
            }}
            className="hover:opacity-65"
          >
            Log Out
          </button>
          <Switch
            checkedChildren="Light Theme"
            style={{
              backgroundColor: "#627699",
            }}
            onClick={() => dispatch(changeTheme())}
            unCheckedChildren="Dark Theme"
          />
        </span>
      </menu>
    </div>
  );
}
