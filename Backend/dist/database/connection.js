"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const sequelizeConnection = new sequelize_1.Sequelize(process.env.MYSQL_ADDON_URI, {
    dialect: "mysql",
});
exports.default = sequelizeConnection;
