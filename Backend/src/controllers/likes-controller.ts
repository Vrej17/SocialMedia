import { Request, Response } from "express";

import { v4 } from "uuid";
import Like from "../database/models/likes";
import User from "../database/models/user";

class likeControl {
  async likePost(req: Request, res: Response) {
    try {
      const { postId, userId } = req.body;

      if (!postId || !userId) {
        return;
      }

      const id = await v4();
      const liked = await Like.create({ id, postId, userId });
      if (liked) {
        return res.sendStatus(200);
      }
      return res.sendStatus(404);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "An internal server error occurred" });
    }
  }
  async dislikePost(req: Request, res: Response) {
    try {
      const { postId, userId } = req.body;
      if (!postId || !userId) {
        return;
      }
      await Like.destroy({ where: { postId, userId } });
      const like = await Like.findOne({ where: { postId, userId } });
      if (!like) {
        return res.sendStatus(200);
      }
      return res.sendStatus(400);
    } catch (error) {
      res.status(500).json({ error: "Invalid Server Error" });
    }
  }
  async usersWhoLike(req: Request, res: Response) {
    try {
      const { postId } = req.params;
      if (!postId) {
        return res.status(400).json([]);
      }

      const usersIdWhoLike = await Like.findAll({
        where: { postId },
        attributes: ["userId"],
      });
      if (usersIdWhoLike.length === 0) {
        return res.status(200).json([]);
      }

      const usersWhoLike = await Promise.all(
        usersIdWhoLike.map(async (like) => {
          const user = await User.findOne({
            where: { id: like.userId },
            attributes: { exclude: ["token", "password"] },
          });
          return user;
        })
      );

      if (usersWhoLike.length === 0) {
        return res.status(200).json([]);
      }

      const validUsers = usersWhoLike.filter((user) => user !== null);

      res.status(200).json(validUsers);
    } catch (error) {
      console.error("Error fetching users who liked the post:", error);
      res.status(500).json({error:"Internal Server Error"});
    }
  }
}
export const likesController = new likeControl();
