import express from "express";
import userRouter from "./routes/userRoutes";
import sequelize from "./database/connection";
import { config } from "dotenv";
import postRoutes from "./routes/postRoutes";
import User from "./database/models/user";
import Post from "./database/models/post";
import bodyParser from "body-parser";
export const SECRET_KEY = "my-secret-key ";
import cors from "cors";
config();
const app = express();
const port = 4444;
app.use(bodyParser.json({ limit: "10mb" })); 
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

User.associate();
Post.associate();

app.use("/user", userRouter);
app.use("/post", postRoutes);
const testDatabaseConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log(
      "Connection to the database has been established successfully."
    );
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

const syncDatabase = async () => {
  try {
    await sequelize.sync();
    console.log("Database & tables created!");
  } catch (error) {
    console.error("Error syncing database:", error);
  }
};

const startServer = async () => {
  await testDatabaseConnection();
  await syncDatabase();

  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
};

startServer();
