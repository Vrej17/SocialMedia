import { Request, Response } from "express";
import Post from "../database/models/post";
import { v4 } from "uuid";
import Like from "../database/models/likes";
import User from "../database/models/user";

class postsControl {
  async createPost(req: Request, res: Response) {
    try {
      const id = await v4();
      const postForm = req.body;
      const postCreated = await Post.create({ id, ...postForm });
      if (postCreated) {
        return res.status(200).json(postCreated.dataValues);
      }
      res.status(400).json({ error: "Post Not Created Try Again" });
    } catch (error) {
      res.status(500).json({ error: "internal Server Error" });
    }
  }
  async findPosts(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const recomendedPosts = await Post.findAll();

      if (!recomendedPosts) {
        return res
          .status(404)
          .json({ error: "Something Went Wrong Please Try Again Later" });
      }
      const likeOfPosts = await Promise.all(
        recomendedPosts.map(async (post) => {
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
      if (!likeOfPosts) {
        return res.sendStatus(500);
      }
      const postedUsers = await Promise.all(
        recomendedPosts.map(async (post) => {
          const user = await User.findOne({
            where: { id: post.userId },
            attributes: { exclude: ["token", "password"] },
          });

          return user && user;
        })
      );
      if (!postedUsers) {
        return res.sendStatus(500);
      }
      res.status(200).json({
        posts: recomendedPosts,
        likes: likeOfPosts,
        users: postedUsers,
      });
    } catch (error) {
      res.status(500).json({ error: "Invalid Server Error" });
    }
  }
  async findUserPosts(req: Request, res: Response) {
    const { userId } = req.params;

    if (!userId) {
      return res.sendStatus(300);
    }

    try {
      const posts = await Post.findAll({ where: { userId } });

      if (posts.length === 0) {
        return res.sendStatus(400);
      }
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
      if (!likeOfPosts) {
        return res.sendStatus(500);
      }

      res.status(200).json({
        posts: posts,
        likes: likeOfPosts,
      });
    } catch (error) {
      res.sendStatus(500);
    }
  }
}
export const postsController = new postsControl();
