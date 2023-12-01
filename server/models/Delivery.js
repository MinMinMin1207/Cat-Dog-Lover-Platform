import sequelize from "../database/database.js";

import { DataTypes } from "sequelize";
import SQLModel from "../common/SQLModel.js";

import User from "./User.js";

let tableName = "deliveries";

const Delivery = sequelize.define(tableName, {
  receiverName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  receiverAddress: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  receiverPhone: {
    type: DataTypes.INTEGER,
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

User.hasMany(Delivery);
Delivery.belongsTo(User);

Delivery.sync().then(() => {
  console.log("Deliveries table created!");
});

export default Delivery;
