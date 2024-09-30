import { Router } from "express";

import { userController } from "../controllers/user-controller";

const userRouter: Router = Router();

userRouter.get("/profile", userController.authenticateToken);
userRouter.get("/:id", userController.finding);
userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.get("/:userId", userController.getUser);
userRouter.put("/update/:userId", userController.updateUser);

export default userRouter;
