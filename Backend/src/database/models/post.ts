import sequelize from "../connection";
import User from "./user";
import Like from "./likes";
import { DataTypes, Model } from "sequelize";
class Post extends Model {
  public id!: string;
  public title!: string;
  public description!: string;
  public image!: Text;
  public userId!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate() {
    Post.belongsTo(User, {
      foreignKey: "userId",
      as: "user",
    });

    Post.belongsToMany(User, {
      through: Like,
      foreignKey: "postId",
      as: "likes",
    });
  }
}

Post.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Post",
  }
);

export default Post;
