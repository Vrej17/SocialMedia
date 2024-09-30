"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../connection"));
class Like extends sequelize_1.Model {
}
Like.init({
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
        allowNull: true,
    },
    postId: {
        type: sequelize_1.DataTypes.STRING,
        references: {
            model: "Posts",
            key: "id",
        },
        allowNull: false,
    },
    userId: {
        type: sequelize_1.DataTypes.STRING,
        references: {
            model: "Users",
            key: "id",
        },
        allowNull: true,
    },
}, { timestamps: false, sequelize: connection_1.default, modelName: "Like" });
exports.default = Like;
