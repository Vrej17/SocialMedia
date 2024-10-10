import clsx from "clsx";
import { base64, imageAvatar } from "../../constants/constnats";
import { AppDispatch, RootState } from "../../dataTypes";
import { useDispatch, useSelector } from "react-redux";

import { ArrowLeftOutlined, EditOutlined } from "@ant-design/icons";
import { Dispatch, SetStateAction, useState } from "react";
import { changeImgUrl } from "../../utils/postFunctions";
import { updateUser } from "../../asyncThunks/profileThunks";
import { removeProfileErrMessage } from "../../Slices/Slices";
import ErrMessage from "./ErrMessage";

export function ChangeProfile({
  setIsChangeProfile,
}: {
  setIsChangeProfile: Dispatch<SetStateAction<boolean>>;
}) {
  const profile = useSelector((state: RootState) => state.myprofile.myprofile);
  const theme = useSelector((state: RootState) => state.theme);
  const [icon, setIcon] = useState(
    profile.icon?.length > 0 ? profile.icon : imageAvatar
  );
  const [profileChangeForm, setProfileChangeForm] = useState<{
    username: string;
    bio: string;
  }>({
    username: profile.username,
    bio: profile.bio,
  });

  const [changeProfileSuccess, setChangeProfileSuccess] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const profileErrMessage = useSelector(
    (state: RootState) => state.myprofile.profileErrMessage
  );

  return (
    <>
      <div
        className={clsx(
          "rounded-2xl relative",
          theme ? "bg-slate-100" : "bg-slate-900"
        )}
      >
        <ArrowLeftOutlined
          className={clsx(
            "text-[25px] absolute top-2 left-2",
            theme ? "text-black" : "text-white"
          )}
          onClick={() =>
            changeProfileSuccess ? null : setIsChangeProfile(false)
          }
        />{" "}
        <div className="p-4 gap-2 mt-6">
          <label
            htmlFor="ProfileAvatar"
            className="flex cursor-pointer relative"
          >
            <img
              src={`${base64}${icon}`}
              className="w-48 rounded-full h-48 object-cover mx-auto"
              alt="Profile Icon"
            />
            <EditOutlined
              className={clsx(
                "text-[35px] absolute bottom-4 right-2 duration-300 transition-all",
                theme ? "text-black" : "text-white"
              )}
            />
            <input
              type="file"
              id="ProfileAvatar"
              hidden
              onChange={(e) =>
                changeProfileSuccess
                  ? null
                  : changeImgUrl({ e, setImgUrl: setIcon })
              }
            />
          </label>
          <div className="p-1 flex flex-col">
            <input
              type="text"
              placeholder="Username"
              onChange={(e) =>
                changeProfileSuccess
                  ? null
                  : setProfileChangeForm({
                      ...profileChangeForm,
                      username: e.target.value,
                    })
              }
              value={profileChangeForm.username}
              className="w-full p-2 rounded-md text-xl outline-cyan-800"
            />
            <input
              type="text"
              placeholder="Bio"
              onChange={(e) =>
                changeProfileSuccess
                  ? null
                  : setProfileChangeForm({
                      ...profileChangeForm,
                      bio: e.target.value,
                    })
              }
              value={profileChangeForm.bio}
              className="w-full p-2 my-2 rounded-md text-xl outline-cyan-800"
            />

            <button
              disabled={
                (profileChangeForm.username === profile.username &&
                  profileChangeForm.bio === profile.bio &&
                  icon === profile.icon) ||
                changeProfileSuccess
              }
              onClick={() => {
                setChangeProfileSuccess(true);
              }}
              className="p-2 mt-auto rounded-md w-max ml-auto outline-none border-none bg-gradient-header hover:scale-105 duration-300 transition-all text-white"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
      {profileErrMessage ? (
        <ErrMessage
          errMessage={profileErrMessage}
          deleteMessage={() => dispatch(removeProfileErrMessage())}
        />
      ) : (
        <div
          className={clsx(
            "absolute flex flex-col text-black h-32 rounded-xl py-2 px-6 transition-all duration-700 bg-slate-100 shadow-2xl",
            changeProfileSuccess ? "bottom-[40%]" : "bottom-[2000px]"
          )}
        >
          <h1 className="font-bold text-xl">
            Are You Sure That You Want to Change Profile?
          </h1>
          <div className="flex justify-end gap-4 mt-auto">
            <button
              className="border border-black rounded-lg px-2 py-2 bg-transparent hover:bg-sky-800 hover:text-white  duration-300 transition-all"
              onClick={() => {
                dispatch(
                  updateUser({
                    ...profileChangeForm,
                    userId: profile.id,
                    icon,
                  })
                ).then(() => {
                  setIsChangeProfile(false);
                });
              }}
            >
              Change Profile
            </button>
            <button
              onClick={() => {
                dispatch(removeProfileErrMessage());
                setChangeProfileSuccess(false);
              }}
              className="bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-800 duration-300 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}
