import sequelize from "../database/database.js";

import { DataTypes } from "sequelize";

import SQLModel from "../common/SQLModel.js";
import Post from "./Post.js";

let tableName = "services";

const Service = sequelize.define(tableName, {
  serviceName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  servicePrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
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

Post.hasOne(Service);
Service.belongsTo(Post);

Service.sync().then(() => {
  console.log("Services table created!");
});

export default Service;
