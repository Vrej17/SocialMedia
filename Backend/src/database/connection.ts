import { Sequelize } from "sequelize";
import { config } from "dotenv";

config();

const sequelizeConnection = new Sequelize(
  process.env.MYSQL_ADDON_URI as string,
  {
    dialect: "mysql",
  }
);

export default sequelizeConnection;
