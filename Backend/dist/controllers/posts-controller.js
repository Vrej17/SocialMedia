"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsController = void 0;
const post_1 = __importDefault(require("../database/models/post"));
const uuid_1 = require("uuid");
const post_services_1 = require("../services/post-services");
const likes_services_1 = require("../services/likes-services");
const user_1 = __importDefault(require("../database/models/user"));
class postsControl {
    createPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = yield (0, uuid_1.v4)();
                const postForm = req.body;
                const postCreated = yield post_1.default.create(Object.assign({ id }, postForm));
                if (postCreated) {
                    return res.status(200).json(postCreated.dataValues);
                }
                res.status(400).json({ error: "Post Not Created Try Again" });
            }
            catch (error) {
                res.status(500).json({ error: "internal Server Error" });
            }
        });
    }
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.params;
                const recomendedPosts = yield post_services_1.postService.findAllPosts();
                const likeOfPosts = yield likes_services_1.likeService.findUserLikes(recomendedPosts, userId);
                const postedUsers = yield Promise.all(recomendedPosts.map((post) => __awaiter(this, void 0, void 0, function* () {
                    const user = yield user_1.default.findOne({
                        where: { id: post.userId },
                        attributes: { exclude: ["token", "password"] },
                    });
                    return user && user;
                })));
                res.status(200).json({
                    posts: recomendedPosts,
                    likes: likeOfPosts,
                    users: postedUsers,
                });
            }
            catch (error) {
                res.status(404).json({ message: error.message || "Failed To Get Posts" });
            }
        });
    }
    findUserPostsLikes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.params;
            if (!userId) {
                return res.sendStatus(300);
            }
            try {
                const userPosts = yield post_services_1.postService.findUserPosts(userId);
                if (userPosts.length === 0) {
                    return res.status(400);
                }
                const likeOfPosts = yield likes_services_1.likeService.findUserLikes(userPosts, userId);
                if (!likeOfPosts) {
                    return res.sendStatus(500);
                }
                res.status(200).json({
                    likes: likeOfPosts,
                });
            }
            catch (error) {
                res.sendStatus(500);
            }
        });
    }
    findUserPosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userPosts = yield post_services_1.postService.findUserPosts(req.params.userId);
                res.status(200).json(userPosts);
            }
            catch (error) {
                res.status(404).json({ message: error.message || "Server Error" });
            }
        });
    }
}
exports.postsController = new postsControl();
