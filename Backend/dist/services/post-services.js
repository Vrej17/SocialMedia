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
exports.postService = void 0;
const post_1 = __importDefault(require("../database/models/post"));
class postServices {
    findUserPosts(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userPosts = yield post_1.default.findAll({ where: { userId } });
            return userPosts;
        });
    }
    findAllPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            const recomendedPosts = yield post_1.default.findAll();
            if (recomendedPosts.length === 0) {
                throw new Error("The data base was empty,Please share any post for viewing");
            }
            return recomendedPosts;
        });
    }
}
exports.postService = new postServices();
