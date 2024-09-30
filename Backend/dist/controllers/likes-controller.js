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
exports.likesController = void 0;
const uuid_1 = require("uuid");
const likes_1 = __importDefault(require("../database/models/likes"));
const user_1 = __importDefault(require("../database/models/user"));
class likeControl {
    likePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { postId, userId } = req.body;
                if (!postId || !userId) {
                    return;
                }
                const id = yield (0, uuid_1.v4)();
                const liked = yield likes_1.default.create({ id, postId, userId });
                if (liked) {
                    return res.sendStatus(200);
                }
                return res.sendStatus(404);
            }
            catch (error) {
                return res
                    .status(500)
                    .json({ error: "An internal server error occurred" });
            }
        });
    }
    dislikePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { postId, userId } = req.body;
                if (!postId || !userId) {
                    return;
                }
                yield likes_1.default.destroy({ where: { postId, userId } });
                const like = yield likes_1.default.findOne({ where: { postId, userId } });
                if (!like) {
                    return res.sendStatus(200);
                }
                return res.sendStatus(400);
            }
            catch (error) {
                res.status(500).json({ error: "Invalid Server Error" });
            }
        });
    }
    usersWhoLike(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { postId } = req.params;
                if (!postId) {
                    return res.status(400).json([]);
                }
                const usersIdWhoLike = yield likes_1.default.findAll({
                    where: { postId },
                    attributes: ["userId"],
                });
                if (usersIdWhoLike.length === 0) {
                    return res.status(200).json([]);
                }
                const usersWhoLike = yield Promise.all(usersIdWhoLike.map((like) => __awaiter(this, void 0, void 0, function* () {
                    const user = yield user_1.default.findOne({
                        where: { id: like.userId },
                        attributes: { exclude: ["token", "password"] },
                    });
                    return user;
                })));
                if (usersWhoLike.length === 0) {
                    return res.status(200).json([]);
                }
                const validUsers = usersWhoLike.filter((user) => user !== null);
                res.status(200).json(validUsers);
            }
            catch (error) {
                console.error("Error fetching users who liked the post:", error);
                res.status(500).send("Internal Server Error");
            }
        });
    }
}
exports.likesController = new likeControl();
