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
exports.likeService = void 0;
const likes_1 = __importDefault(require("../database/models/likes"));
class likeServices {
    findUserLikes(posts, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const likeOfPosts = yield Promise.all(posts.map((post) => __awaiter(this, void 0, void 0, function* () {
                const likeCount = yield likes_1.default.count({
                    where: { postId: post.id },
                });
                const isLiked = yield likes_1.default.findOne({
                    where: { postId: post.id, userId: userId },
                });
                return {
                    countsOfLike: likeCount ? likeCount : 0,
                    isLikedByUser: isLiked ? true : false,
                };
            })));
            return likeOfPosts;
        });
    }
}
exports.likeService = new likeServices();
