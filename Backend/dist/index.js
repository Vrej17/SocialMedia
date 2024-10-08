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
const user_routes_1 = __importDefault(require("./routes/user-routes"));
const connection_1 = __importDefault(require("./database/connection"));
const dotenv_1 = require("dotenv");
const post_routes_1 = __importDefault(require("./routes/post-routes"));
const user_1 = __importDefault(require("./database/models/user"));
const post_1 = __importDefault(require("./database/models/post"));
const body_parser_1 = __importDefault(require("body-parser"));
exports.SECRET_KEY = "my-secret-key ";
const cors_1 = __importDefault(require("cors"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
const port = 4444;
app.use(body_parser_1.default.json({ limit: "10mb" }));
app.use(body_parser_1.default.urlencoded({ limit: "10mb", extended: true }));
app.use((0, cors_1.default)({ origin: "http://localhost:3000", credentials: true }));
user_1.default.associate();
post_1.default.associate();
app.use("/user", user_routes_1.default);
app.use("/post", post_routes_1.default);
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
