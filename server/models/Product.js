import sequelize from "../database/database.js";

import { DataTypes } from "sequelize";
import SQLModel from "../common/SQLModel.js";

import Post from "./Post.js";

let tableName = "products";

const Product = sequelize.define(tableName, {
  productName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  typeOfPet: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  typeofProduct: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  size: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ban: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  sold: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  expiredDate: {
    type: DataTypes.DATE,
    allowNull: true,
    timestamps: true,
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

Post.hasOne(Product);
Product.belongsTo(Post);

Product.sync().then(() => {
  console.log("Products table created!");
});

export default Product;
