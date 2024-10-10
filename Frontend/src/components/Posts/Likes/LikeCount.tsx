import { HeartSVG } from "../../SVG/HeartSVG";


type LikeCountType = {
  addLike: () => void;
  addDislike: () => void;
  getUsersWhoLike: () => void;
  likes: {
    countsOfLike: number;
    isLikedByUser: boolean;
  };

};
export function LikeCount({
  likes,
  addLike,
  addDislike,
  getUsersWhoLike,
}: LikeCountType) {


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
