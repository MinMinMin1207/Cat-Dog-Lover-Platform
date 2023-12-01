import sequelize from "../database/database.js";

import { DataTypes } from "sequelize";
import SQLModel from "../common/SQLModel.js";

import User from "./Order.js";

let tableName = "discounts";

const Discount = sequelize.define(tableName, {
  code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  value: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  expiredTime: {
    type: DataTypes.DATE,
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

User.hasMany(Discount);
Discount.belongsTo(User);

Discount.sync().then(() => {
  console.log("Discounts table created!");
});

export default Discount;
