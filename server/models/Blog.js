import sequelize from "../database/database.js";

import { DataTypes } from "sequelize";
import SQLModel from "../common/SQLModel.js";

import User from "./User.js";
import Post from "./Post.js";

let tableName = "blogs";

const Blog = sequelize.define(tableName, {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ban: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Post,
      key: "id",
    },
  },

  ...SQLModel,
});

User.hasMany(Blog);
Blog.belongsTo(User);

Post.hasMany(Blog);
Blog.belongsTo(Post);

Blog.sync().then(() => {
  console.log("Blogs table created!");
});

export default Blog;
