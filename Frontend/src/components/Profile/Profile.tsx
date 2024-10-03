import { useSelector } from "react-redux";
import { postType, RootState } from "../../dataTypes";
import { useState } from "react";
import clsx from "clsx";
import { ProfilePosts } from "./ProfilePosts";
import ProfilePostCreate from "./ProfilePostCreate";
import ProfileInfo from "./ProfileInfo";
import ProfileMenu from "./ProfileMenu";
import { ChangeProfile } from "./ChangeProfile";


export default function Profile() {
  const profile = useSelector((state: RootState) => state.myprofile.myprofile);
  const theme = useSelector((state: RootState) => state.theme);
  const [userPosts, setUserPosts] = useState<postType[]>([]);
  const [imgUrl, setImgUrl] = useState("");
  const [isChangeProfile, setIsChangeProfile] = useState(false);
  


  return (
    <>
      <div
        className={clsx(
          "rounded-2xl font-primaryRegular w-[700px] mobile:w-[400px] relative overflow-hidden mobile-md:w-64 p-6",
          theme ? "bg-slate-100" : "bg-slate-900 [&>div]:text-white",
          imgUrl || isChangeProfile ? "hidden" : ""
        )}
      >
        <ProfileMenu
          setImgUrl={setImgUrl}
          setIsChangeProfile={setIsChangeProfile}
        />

        <ProfileInfo />
        <div
          className={clsx(
            "border-slate-600 h-0 mt-2 border-opacity-30 rounded-full border-2 w-full"
          )}
        ></div>
        <ProfilePosts
          userInfo={profile}
          userId={profile.id}
          setUserPosts={setUserPosts}
          userPosts={userPosts}
        ></ProfilePosts>
      </div>
      {imgUrl.length !== 0 && (
        <ProfilePostCreate
          setImgUrl={setImgUrl}
          setUserPosts={setUserPosts}
          imgUrl={imgUrl}
        />
      )}
      {isChangeProfile && (
        <ChangeProfile setIsChangeProfile={setIsChangeProfile} />
      )}
    </>
  );
}
