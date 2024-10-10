import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../dataTypes";
import clsx from "clsx";
import { Descriptions } from "./Description";
import { LikesCount } from "./Likes/LikesCount";
import { LikedPostUsers } from "./Likes/LikedPostUsers";
import { base64 } from "../../constants/constnats";

interface PostInterface {
  postId: string;
  image: string;
  description: string;
  title: string;
  index: number;
}
export function Post({
  postId,
  image,
  description,
  title,
  index,
}: PostInterface) {
  const [openLikes, setOpenLikes] = useState(false);
  const userInfo = useSelector((state: RootState) => state.posts.users[index]);

  const profileId = useSelector(
    (state: RootState) => state.myprofile.myprofile.id
  );
  const theme = useSelector((state: RootState) => state.theme);

  return (
    <section
      className={clsx(
        "rounded-2xl flex w-96 mobile-md:w-[350px] mobile-sm:w-56 flex-col shadow-2xl [&_*]:transition-all [&_*]:duration-1000 relative my-5 overflow-hidden",
        theme
          ? "[&_*]:bg-white [&_*]:text-black"
          : "[&_*]:bg-black [&_*]:text-white"
      )}
    >
      <img
        src={`${base64}${image}`}
        alt="Post"
        loading="lazy"
        className="rounded-t-2xl max-h-[400px] object-cover"
      />
      <div className="flex flex-col gap-x-3 p-3">
        <Descriptions
          userInfo={userInfo}
          title={title}
          description={description}
        />

        <LikesCount
          userId={profileId}
          postId={postId}
          setOpenLikes={setOpenLikes}
          index={index}
        />
        <LikedPostUsers openLikes={openLikes} setOpenLikes={setOpenLikes} />
      </div>
    </section>
  );
}
