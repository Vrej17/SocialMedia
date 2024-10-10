import { Request, Response } from "express";

import User from "../database/models/user";
import { userService } from "../services/user-services";
import { postService } from "../services/post-services";

class userControl {
  async findingWithPosts(req: Request, res: Response) {
    try {
      const user = await userService.findUser(req);
      const userPosts = await postService.findUserPosts(req.params.id);
      res.status(200).json({ user, userPosts });
    } catch (error: any) {
      return res
        .status(404)
        .json({ message: error.message || "Internal Server Error" });
    }
  }

  async register(req: Request, res: Response) {
    try {
      const userCreate = await userService.registerUser(req);

      res.status(200).json(userCreate);
    } catch (error: any) {
      res
        .status(409)
        .json({ message: error.message || "Internal Server Error" });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const IsLoggedUser = await userService.loginUser(req);

      res.status(200).json(IsLoggedUser);
    } catch (error: any) {
      res
        .status(400)
        .json({ message: error.message || "Internal Server Error" });
    }
  }
  async authenticateToken(req: Request, res: Response) {
    try {
      const isCorrect = await userService.isCorrectToken(req);

      res.status(200).json(isCorrect);
    } catch (error: any) {
      res
        .status(404)
        .json({ message: error.message || "Internal Server Error" });
    }
  }
  async updateUser(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { username, bio, icon } = req.body;
      const updatedCount = await User.update(
        { username, bio, icon },
        { where: { id: userId } }
      );
      if (!updatedCount) {
        throw new Error("Something Went Wrong To Update");
      }
      return res.sendStatus(200);
    } catch (err: any) {
      res.status(400).json({ message: err.message || "Internal Server Error" });
    }
  }
}
export const userController = new userControl();
