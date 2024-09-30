import { Model, DataTypes } from "sequelize";
import sequelize from "../connection";

class Like extends Model {
  public readonly id!: string;
  public postId!: string;
  public userId!: string;

  
}

Like.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: true,
    },
    postId: {
      type: DataTypes.STRING,
      references: {
        model: "Posts",
        key: "id",
      },
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      references: {
        model: "Users",
        key: "id",
      },
      allowNull: true,
    },
  },
  { timestamps: false, sequelize, modelName: "Like" }
);

export default Like;
