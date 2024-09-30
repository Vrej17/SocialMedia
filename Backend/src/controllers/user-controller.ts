import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { SECRET_KEY } from "..";
import User from "../database/models/user";
import { v4 } from "uuid";

class userControl {
  async finding(req: Request, res: Response) {
    try {
      const find = await User.findOne({
        where: { id: req.params.id },
        attributes: ["id", "username", "bio", "icon"],
      });
      if (find) {
        return res.status(200).json(find);
      } else {
        res.status(404).json({ error: "User Not Found" });
      }
    } catch (err) {
      return res.status(403).json({ error: "Internal Server Error" });
    }
  }

  async register(req: Request, res: Response) {
    try {
      const isUniqueName = await User.findOne({
        where: { username: req.body.name },
      });
      if (isUniqueName) {
        return res.status(403).json({ error: "Name Already Used" });
      }

      const idGen: string = await v4();

      const token = jwt.sign({ id: idGen }, SECRET_KEY, {
        expiresIn: "30d",
      });
      const creat = await User.create({
        id: idGen,
        username: req.body.name,
        password: req.body.password,
      });
      const { password, ...other } = creat.dataValues;
      res.status(201).json({ other, token });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const isUnique = await User.findOne({
        where: { username: req.body.name },
      });
      if (isUnique) {
        const isVaildPass = await bcrypt.compare(
          req.body.password,
          isUnique.password
        );
        if (isVaildPass) {
          const token = jwt.sign({ id: isUnique.id }, SECRET_KEY, {
            expiresIn: "39d",
          });
          const { password, ...other } = isUnique.dataValues;
          return res.status(201).json({ ...other, token });
        }
      }
      res.status(300).json({ error: "name or password failed" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  async authenticateToken(req: Request, res: Response) {
    try {
      const authHeader = req.headers["authorization"];
      const token =
        authHeader && authHeader.startsWith("Bearer ")
          ? authHeader.split(" ")[1]
          : "";
      const decoded = jwt.verify(token, SECRET_KEY) as { id: string };
      if (!decoded) {
        return res.status(402).json({ error: "Please Login or Register" });
      }
      const user = await User.findOne({
        where: { id: decoded.id },
        attributes: { exclude: ["password"] },
      });
      if (user) {
        return res.status(201).json(user);
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  async getUser(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const user = await User.findOne({
        where: { id: userId },
        attributes: { exclude: ["password"] },
      });
      if (!user) {
        return res.sendStatus(404);
      }
      res.status(200).json(user);
    } catch (error) {
      return res.sendStatus(500);
    }
  }
  async updateUser(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { username, bio, icon } = req.body;
      const user = await User.update(
        { username, bio, icon },
        { where: { id: userId } }
      );
      if (!user) {
        return res.sendStatus(400);
      }
      return res.sendStatus(200);
    } catch (error) {
      res.sendStatus(500);
    }
  }
}
export const userController = new userControl();
