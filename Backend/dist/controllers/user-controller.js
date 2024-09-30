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
exports.userController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const __1 = require("..");
const user_1 = __importDefault(require("../database/models/user"));
const uuid_1 = require("uuid");
class userControl {
    finding(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const find = yield user_1.default.findOne({
                    where: { id: req.params.id },
                    attributes: ["id", "username", "bio", "icon"],
                });
                if (find) {
                    return res.status(200).json(find);
                }
                else {
                    res.status(404).json({ error: "User Not Found" });
                }
            }
            catch (err) {
                return res.status(403).json({ error: "Internal Server Error" });
            }
        });
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isUniqueName = yield user_1.default.findOne({
                    where: { username: req.body.name },
                });
                if (isUniqueName) {
                    return res.status(403).json({ error: "Name Already Used" });
                }
                const idGen = yield (0, uuid_1.v4)();
                const token = jsonwebtoken_1.default.sign({ id: idGen }, __1.SECRET_KEY, {
                    expiresIn: "30d",
                });
                const creat = yield user_1.default.create({
                    id: idGen,
                    username: req.body.name,
                    password: req.body.password,
                });
                const _a = creat.dataValues, { password } = _a, other = __rest(_a, ["password"]);
                res.status(201).json({ other, token });
            }
            catch (error) {
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isUnique = yield user_1.default.findOne({
                    where: { username: req.body.name },
                });
                if (isUnique) {
                    const isVaildPass = yield bcrypt_1.default.compare(req.body.password, isUnique.password);
                    if (isVaildPass) {
                        const token = jsonwebtoken_1.default.sign({ id: isUnique.id }, __1.SECRET_KEY, {
                            expiresIn: "39d",
                        });
                        const _a = isUnique.dataValues, { password } = _a, other = __rest(_a, ["password"]);
                        return res.status(201).json(Object.assign(Object.assign({}, other), { token }));
                    }
                }
                res.status(300).json({ error: "name or password failed" });
            }
            catch (error) {
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
    authenticateToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const authHeader = req.headers["authorization"];
                const token = authHeader && authHeader.startsWith("Bearer ")
                    ? authHeader.split(" ")[1]
                    : "";
                const decoded = jsonwebtoken_1.default.verify(token, __1.SECRET_KEY);
                if (!decoded) {
                    return res.status(402).json({ error: "Please Login or Register" });
                }
                const user = yield user_1.default.findOne({
                    where: { id: decoded.id },
                    attributes: { exclude: ["password"] },
                });
                if (user) {
                    return res.status(201).json(user);
                }
            }
            catch (error) {
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.params;
                const user = yield user_1.default.findOne({
                    where: { id: userId },
                    attributes: { exclude: ["password"] },
                });
                if (!user) {
                    return res.sendStatus(404);
                }
                res.status(200).json(user);
            }
            catch (error) {
                return res.sendStatus(500);
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.params;
                const { username, bio, icon } = req.body;
                const user = yield user_1.default.update({ username, bio, icon }, { where: { id: userId } });
                if (!user) {
                    return res.sendStatus(400);
                }
                return res.sendStatus(200);
            }
            catch (error) {
                res.sendStatus(500);
            }
        });
    }
}
exports.userController = new userControl();
