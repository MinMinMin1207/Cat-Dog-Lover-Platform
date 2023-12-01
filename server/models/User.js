import sequelize from "../database/database.js";

import { DataTypes } from "sequelize";
import SQLModel from "../common/SQLModel.js";

let tableName = "users";

const User = sequelize.define(tableName, {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "US",
  },
  dob: {
    type: DataTypes.DATE,
    allowNull: true,
    timestamps: true,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phoneNumber: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  bio: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  rate: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ban: {
    type: DataTypes.STRING,
    allowNull: true,
  },  
  STK: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  bank: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ...SQLModel,
});

User.sync().then(() => {
  console.log("Users table created!");
});

export default User;
