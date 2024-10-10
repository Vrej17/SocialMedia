import { useSelector } from "react-redux";
import { PostType, RootState } from "../../dataTypes";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { ProfilePosts } from "./ProfilePosts";
import {PostCreate} from "./PostCreate";
import { InfoProfile } from "./InfoProfile";
import { MenuProfile } from "./MenuProfile";
import { ChangeProfile } from "./ChangeProfile";
import { getProfilePosts } from "../../utils/userFunctions";

export function Profile() {
  const profile = useSelector((state: RootState) => state.myprofile.myprofile);
  const theme = useSelector((state: RootState) => state.theme);
  const [userPosts, setUserPosts] = useState<PostType[]>([]);
  const [imgUrl, setImgUrl] = useState("");
  const [isChangeProfile, setIsChangeProfile] = useState(false);

  useEffect(() => {
    if (profile.id) {
      const fetchPosts = async () => {
        setUserPosts(await getProfilePosts(profile.id));
      };

      fetchPosts();
    }
  }, [profile.id]);

  return (
    <>
      <div
        className={clsx(
          "rounded-2xl font-primaryRegular w-[700px] mobile:w-[400px] relative overflow-hidden mobile-md:w-64 p-6",
          theme ? "bg-slate-100" : "bg-slate-900 [&>div]:text-white",
          imgUrl || isChangeProfile ? "hidden" : ""
        )}
      >
        <MenuProfile
          setImgUrl={setImgUrl}
          setIsChangeProfile={setIsChangeProfile}
        />

        <InfoProfile />
        <div
          className={clsx(
            "border-slate-600 h-0 mt-2 border-opacity-30 rounded-full border-2 w-full"
          )}
        ></div>
        <ProfilePosts
          userInfo={profile}
          userId={profile.id}
          userPosts={userPosts}
        ></ProfilePosts>
      </div>
      {imgUrl.length !== 0 && (
        <PostCreate
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
