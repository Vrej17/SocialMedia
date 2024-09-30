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
exports.SECRET_KEY = void 0;
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const connection_1 = __importDefault(require("./database/connection"));
const dotenv_1 = require("dotenv");
const postRoutes_1 = __importDefault(require("./routes/postRoutes"));
const user_1 = __importDefault(require("./database/models/user"));
const post_1 = __importDefault(require("./database/models/post"));
exports.SECRET_KEY = "my-secret-key ";
const cors_1 = __importDefault(require("cors"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
const port = 4444;
app.use(express_1.default.json({ limit: "1Mb" }));
app.use((0, cors_1.default)({ origin: "http://localhost:3000", credentials: true }));
app.use((0, cookie_parser_1.default)());
user_1.default.associate();
post_1.default.associate();
app.use("/user", userRoutes_1.default);
app.use("/post", postRoutes_1.default);
const testDatabaseConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connection_1.default.authenticate();
        console.log("Connection to the database has been established successfully.");
    }
    catch (error) {
        console.error("Unable to connect to the database:", error);
    }
});
const syncDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connection_1.default.sync();
        console.log("Database & tables created!");
    }
    catch (error) {
        console.error("Error syncing database:", error);
    }
});
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    yield testDatabaseConnection();
    yield syncDatabase();
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
});
startServer();
