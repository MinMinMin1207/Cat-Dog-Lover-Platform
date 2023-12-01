import sequelize from "../database/database.js";

import { DataTypes } from "sequelize";
import SQLModel from "../common/SQLModel.js";

import Post from "./Post.js";

let tableName = "pets";

const Pet = sequelize.define(tableName, {
  petName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  species: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  breed: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  petPrice: {
    type: DataTypes.FLOAT,
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

Post.hasOne(Pet);
Pet.belongsTo(Post);

Pet.sync().then(() => {
  console.log('Pets table created!')
})

export default Pet;
