import sequelize from "../database/database.js";

import { DataTypes } from "sequelize";
import SQLModel from "../common/SQLModel.js";

import User from "./User.js";

let tableName = "notifications";

const Notification = sequelize.define(tableName, {
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

User.hasMany(Notification);
Notification.belongsTo(User);

Notification.sync().then(() => {
  console.log("Notifications table created!");
});

export default Notification;
