import sequelize from "../database/database.js";

import { DataTypes } from "sequelize";
import SQLModel from "../common/SQLModel.js";

import User from "./User.js";

let tableName = "posts";

const Post = sequelize.define(tableName, {
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },

  ...SQLModel,
});

User.hasMany(Post);
Post.belongsTo(User);

Post.sync().then(() => {
  console.log("Posts table created!");
});

export default Post;
