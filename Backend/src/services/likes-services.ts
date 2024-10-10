import Like from "../database/models/likes";
import Post from "../database/models/post";

class likeServices {
  async findUserLikes(posts: Post[], userId: string) {
    const likeOfPosts = await Promise.all(
      posts.map(async (post) => {
        const likeCount = await Like.count({
          where: { postId: post.id },
        });
        const isLiked = await Like.findOne({
          where: { postId: post.id, userId: userId },
        });

        return {
          countsOfLike: likeCount ? likeCount : 0,
          isLikedByUser: isLiked ? true : false,
        };
      })
    );
    return likeOfPosts;
  }
}
export const likeService = new likeServices();
