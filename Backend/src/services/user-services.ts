import { v4 } from "uuid";
import User from "../database/models/user";
import { Request } from "express";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "..";
import * as bcrypt from "bcrypt";

class userServices {
  async findUser(req: Request) {
    const finding = await User.findOne({
      where: { id: req.params.id },
      attributes: ["id", "username", "bio", "icon"],
    });
    if (finding) {
      return finding;
    } else {
      throw new Error("User Not Found");
    }
  }
  async registerUser(req: Request) {
    if (!req.body.name.length || !req.body.password.length) {
      throw new Error("Username and Password are required");
    }
    const isUniqueName = await User.findOne({
      where: { username: req.body.name },
    });
    if (isUniqueName) {
      throw new Error("Name Already Used");
    }

    const idGen: string = await v4();

    const token = jwt.sign({ id: idGen }, SECRET_KEY, {
      expiresIn: "30d",
    });
    const createUser = await User.create({
      id: idGen,
      username: req.body.name,
      password: req.body.password,
    });
    const { password, ...other } = createUser.dataValues;
    return { other, token };
  }
  async loginUser(req: Request) {
    if (!req.body.name.length || !req.body.password.length) {
      throw new Error("Username and Password are required");
    }
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
        return { other, token };
      }
    }
    throw new Error("Name Or Password Failed Please Try Again");
  }
  async isCorrectToken(req: Request): Promise<any> {
    const authHeader = req.headers["authorization"];
    const token =
      authHeader && authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : "";

    const decoded = jwt.verify(token, SECRET_KEY) as { id: string };

    if (!decoded.id) {
      throw new Error("Please Log In or Register");
    }

    const isFindWithToken = await User.findOne({
      where: { id: decoded.id },
      attributes: { exclude: ["password"] },
    });

    if (isFindWithToken) {
      return isFindWithToken;
    } else {
      throw new Error("User not found");
    }
  }
}
export const userService = new userServices();
