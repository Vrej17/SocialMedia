
import * as bcrypt from "bcrypt";
import { Model, DataTypes } from "sequelize";
import sequelize from "../connection";
import Post from "./post"; 
import Like from "./likes"; 


class User extends Model {
  public id!: string;
  public username!: string;
  public password!: string;
  public bio!: string;
  public icon!: string;

  public readonly updatedAt!: Date;
  public readonly createdAt!: Date;
  static associate() {
    User.hasMany(Post, {
      sourceKey: "id",
      foreignKey: "userId",
      as: "posts",
    });

    User.belongsToMany(Post, {
      through: Like,
      sourceKey: "id",
      foreignKey: "userId",
      as: "likes",
    });
  }
}

User.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      set(value: string) {
        const salt = bcrypt.genSaltSync(15);
        const hash = bcrypt.hashSync(value, salt);
        return this.setDataValue("password", hash);
      },
    },
    bio: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    icon: {
      allowNull: true,
      type: DataTypes.TEXT("long"),
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);

export default User;
