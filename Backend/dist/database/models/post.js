"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../connection"));
const user_1 = __importDefault(require("./user"));
const likes_1 = __importDefault(require("./likes"));
const sequelize_1 = require("sequelize");
class Post extends sequelize_1.Model {
    static associate() {
        Post.belongsTo(user_1.default, {
            foreignKey: "userId",
            as: "user",
        });
        Post.belongsToMany(user_1.default, {
            through: likes_1.default,
            foreignKey: "postId",
            as: "likes",
        });
    }
}
Post.init({
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    image: {
        type: sequelize_1.DataTypes.TEXT("long"),
        allowNull: false,
    },
    userId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: connection_1.default,
    modelName: "Post",
});
exports.default = Post;
