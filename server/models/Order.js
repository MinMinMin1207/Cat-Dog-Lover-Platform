import sequelize from "../database/database.js";

import { DataTypes } from "sequelize";
import SQLModel from "../common/SQLModel.js";

import Pet from "./Pet.js";
import User from "./User.js";
import Delivery from "./Delivery.js";
// import Discount from "./Discount.js";

let tableName = "orders";

const Order = sequelize.define(tableName, {
  note: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ship: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  paymentMethod: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  petId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Pet,
      key: "id",
    },
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
  deliveryId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Delivery,
      key: "id",
    },
  },
  // discountId: {
  //   type: DataTypes.INTEGER,
  //   allowNull: true,
  //   references: {
  //     model: Discount,
  //     key: "id",
  //   },
  // },
  ...SQLModel,
});

User.hasMany(Order);
Order.belongsTo(User);

Pet.hasOne(Order);
Order.belongsTo(Pet);

Delivery.hasOne(Order);
Order.belongsTo(Delivery);

// Discount.hasOne(Order);
// Order.belongsTo(Discount);

Order.sync().then(() => {
  console.log("Orders table created!");
});

export default Order;
