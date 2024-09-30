import  { Router } from "express";
import { likesController } from "../controllers/likes-controller";
import { postsController } from "../controllers/posts-controller";
const postRoutes: Router = Router();

postRoutes.post("/create", postsController.createPost);
postRoutes.get("/get/:userId", postsController.findPosts);
postRoutes.delete("/dislike", likesController.dislikePost);
postRoutes.post("/like", likesController.likePost);
postRoutes.get("/userswholike/:postId", likesController.usersWhoLike);
postRoutes.get("/userPosts/:userId", postsController.findUserPosts);
export default postRoutes;
