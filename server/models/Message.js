import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

import SQLModel from "../common/SQLModel.js";
import User from "./User.js";

const Message = sequelize.define("messages", {
  ...SQLModel,
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  senderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  roomName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.hasMany(Message, {
  foreignKey: "senderId",
});
Message.belongsTo(User, {
  foreignKey: "senderId",
  as: "sender",
});

Message.sync().then(() => {
  console.log("Messages table created");
});

export default Message;
