import { HeartSVG } from "../../SVG/HeartSVG";
type PostsLikesCountTypes = {
  addLike: () => void;
  addDislike: () => void;
  getUsersWhoLike: () => void;
  likes: {
    countsOfLike: number;
    isLikedByUser: boolean;
  };
};
export function PostsLikesCountAndHeart({
  likes,
  addLike,
  addDislike,
  getUsersWhoLike,
}: PostsLikesCountTypes) {
  return (
    <>
      <button className="text-start" onClick={() => getUsersWhoLike()}>
        Like Counts:{likes.countsOfLike}
      </button>
      <HeartSVG
        userLike={likes.isLikedByUser}
        onClick={() => {
          likes.isLikedByUser ? addDislike() : addLike();
        }}
      />
    </>
  );
}
