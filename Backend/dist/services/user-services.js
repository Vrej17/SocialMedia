"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const uuid_1 = require("uuid");
const user_1 = __importDefault(require("../database/models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const __1 = require("..");
const bcrypt = __importStar(require("bcrypt"));
class userServices {
    findUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const finding = yield user_1.default.findOne({
                where: { id: req.params.id },
                attributes: ["id", "username", "bio", "icon"],
            });
            if (finding) {
                return finding;
            }
            else {
                throw new Error("User Not Found");
            }
        });
    }
    registerUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.body.name.length || !req.body.password.length) {
                throw new Error("Username and Password are required");
            }
            const isUniqueName = yield user_1.default.findOne({
                where: { username: req.body.name },
            });
            if (isUniqueName) {
                throw new Error("Name Already Used");
            }
            const idGen = yield (0, uuid_1.v4)();
            const token = jsonwebtoken_1.default.sign({ id: idGen }, __1.SECRET_KEY, {
                expiresIn: "30d",
            });
            const createUser = yield user_1.default.create({
                id: idGen,
                username: req.body.name,
                password: req.body.password,
            });
            const _a = createUser.dataValues, { password } = _a, other = __rest(_a, ["password"]);
            return { other, token };
        });
    }
    loginUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.body.name.length || !req.body.password.length) {
                throw new Error("Username and Password are required");
            }
            const isUnique = yield user_1.default.findOne({
                where: { username: req.body.name },
            });
            if (isUnique) {
                const isVaildPass = yield bcrypt.compare(req.body.password, isUnique.password);
                if (isVaildPass) {
                    const token = jsonwebtoken_1.default.sign({ id: isUnique.id }, __1.SECRET_KEY, {
                        expiresIn: "39d",
                    });
                    const _a = isUnique.dataValues, { password } = _a, other = __rest(_a, ["password"]);
                    return { other, token };
                }
            }
            throw new Error("Name Or Password Failed Please Try Again");
        });
    }
    isCorrectToken(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const authHeader = req.headers["authorization"];
            const token = authHeader && authHeader.startsWith("Bearer ")
                ? authHeader.split(" ")[1]
                : "";
            const decoded = jsonwebtoken_1.default.verify(token, __1.SECRET_KEY);
            if (!decoded.id) {
                throw new Error("Please Log In or Register");
            }
            const isFindWithToken = yield user_1.default.findOne({
                where: { id: decoded.id },
                attributes: { exclude: ["password"] },
            });
            if (isFindWithToken) {
                return isFindWithToken;
            }
            else {
                throw new Error("User not found");
            }
        });
    }
}
exports.userService = new userServices();
