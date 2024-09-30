"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
exports.sequelize = new sequelize_typescript_1.Sequelize("socialmedia", "root", "", {
    dialect: "mysql",
    host: "127.0.0.1",
    logging: false,
});
