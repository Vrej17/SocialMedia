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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = __importStar(require("bcrypt"));
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../connection"));
const post_1 = __importDefault(require("./post"));
const likes_1 = __importDefault(require("./likes"));
class User extends sequelize_1.Model {
    static associate() {
        User.hasMany(post_1.default, {
            sourceKey: "id",
            foreignKey: "userId",
            as: "posts",
        });
        User.belongsToMany(post_1.default, {
            through: likes_1.default,
            sourceKey: "id",
            foreignKey: "userId",
            as: "likes",
        });
    }
}
User.init({
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    password: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
        set(value) {
            const salt = bcrypt.genSaltSync(15);
            const hash = bcrypt.hashSync(value, salt);
            return this.setDataValue("password", hash);
        },
    },
    bio: {
        allowNull: true,
        type: sequelize_1.DataTypes.STRING,
    },
    icon: {
        allowNull: true,
        type: sequelize_1.DataTypes.TEXT("long"),
    },
    createdAt: {
        allowNull: false,
        type: sequelize_1.DataTypes.DATE,
    },
    updatedAt: {
        allowNull: false,
        type: sequelize_1.DataTypes.DATE,
    },
}, {
    sequelize: connection_1.default,
    modelName: "User",
});
exports.default = User;
