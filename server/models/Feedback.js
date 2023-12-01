import sequelize from "../database/database.js";

import { DataTypes } from "sequelize";
import SQLModel from "../common/SQLModel.js";

import User from "./User.js";
import Order from "./Order.js";
import Product from "./Product.js";
import Service from "./Service.js";

let tableName = "feedbacks";

const Feedback = sequelize.define(tableName, {
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  star: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  customerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
  serviceId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Service,
      key: "id",
    },
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Product,
      key: "id",
    },
  },

  ...SQLModel,
});

User.hasMany(Feedback);
Feedback.belongsTo(User);

Service.hasMany(Feedback);
Feedback.belongsTo(Service);

Product.hasMany(Feedback);
Feedback.belongsTo(Product);

Feedback.sync().then(() => {
  console.log("Feedbacks table created!");
});

export default Feedback;
