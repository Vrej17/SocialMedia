import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../dataTypes";
import clsx from "clsx";
import PostsDescription from "./PostsDescription";
import PostsLikes from "./PostsLikes/PostsLikes";
import PostLikedUsers from "./PostsLikes/PostLikedUsers";
import { base64 } from "../../constants/constnats";

interface PostInterface {
  postId: string;
  image: string;
  description: string;
  title: string;
  index: number;
}
export default function Post({
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
        <PostsDescription
          userInfo={userInfo}
          title={title}
          description={description}
        />

        <PostsLikes
          userId={profileId}
          postId={postId}
          setOpenLikes={setOpenLikes}
          index={index}
        />
        <PostLikedUsers openLikes={openLikes} setOpenLikes={setOpenLikes} />
      </div>
    </section>
  );
}
