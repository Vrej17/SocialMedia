import { Request, Response } from "express";
import Post from "../database/models/post";
import { v4 } from "uuid";
import { postService } from "../services/post-services";
import { likeService } from "../services/likes-services";
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
  async findAll(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const recomendedPosts = await postService.findAllPosts();
      const likeOfPosts = await likeService.findUserLikes(
        recomendedPosts,
        userId
      );

      const postedUsers = await Promise.all(
        recomendedPosts.map(async (post) => {
          const user = await User.findOne({
            where: { id: post.userId },
            attributes: { exclude: ["token", "password"] },
          });

          return user && user;
        })
      );

      res.status(200).json({
        posts: recomendedPosts,
        likes: likeOfPosts,
        users: postedUsers,
      });
    } catch (error: any) {
      res.status(404).json({ message: error.message || "Failed To Get Posts" });
    }
  }
  async findUserPostsLikes(req: Request, res: Response) {
    const { userId } = req.params;

    if (!userId) {
      return res.sendStatus(300);
    }

    try {
      const userPosts = await postService.findUserPosts(userId);

      if (userPosts.length === 0) {
        return res.status(400);
      }
      const likeOfPosts = await likeService.findUserLikes(userPosts, userId);
      if (!likeOfPosts) {
        return res.sendStatus(500);
      }

      res.status(200).json({
        likes: likeOfPosts,
      });
    } catch (error) {
      res.sendStatus(500);
    }
  }
  async findUserPosts(req: Request, res: Response) {
    try {
      const userPosts = await postService.findUserPosts(req.params.userId);
      res.status(200).json(userPosts);
    } catch (error: any) {
      res.status(404).json({ message: error.message || "Server Error" });
    }
  }
}

export const postsController = new postsControl();
