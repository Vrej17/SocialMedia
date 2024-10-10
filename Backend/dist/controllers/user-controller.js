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
exports.userController = void 0;
const user_1 = __importDefault(require("../database/models/user"));
const user_services_1 = require("../services/user-services");
const post_services_1 = require("../services/post-services");
class userControl {
    findingWithPosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_services_1.userService.findUser(req);
                const userPosts = yield post_services_1.postService.findUserPosts(req.params.id);
                res.status(200).json({ user, userPosts });
            }
            catch (error) {
                return res
                    .status(404)
                    .json({ message: error.message || "Internal Server Error" });
            }
        });
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userCreate = yield user_services_1.userService.registerUser(req);
                res.status(200).json(userCreate);
            }
            catch (error) {
                res
                    .status(409)
                    .json({ message: error.message || "Internal Server Error" });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const IsLoggedUser = yield user_services_1.userService.loginUser(req);
                res.status(200).json(IsLoggedUser);
            }
            catch (error) {
                res
                    .status(400)
                    .json({ message: error.message || "Internal Server Error" });
            }
        });
    }
    authenticateToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isCorrect = yield user_services_1.userService.isCorrectToken(req);
                res.status(200).json(isCorrect);
            }
            catch (error) {
                res
                    .status(404)
                    .json({ message: error.message || "Internal Server Error" });
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.params;
                const { username, bio, icon } = req.body;
                const updatedCount = yield user_1.default.update({ username, bio, icon }, { where: { id: userId } });
                if (!updatedCount) {
                    throw new Error("Something Went Wrong To Update");
                }
                return res.sendStatus(200);
            }
            catch (err) {
                res.status(400).json({ message: err.message || "Internal Server Error" });
            }
        });
    }
}
exports.userController = new userControl();
