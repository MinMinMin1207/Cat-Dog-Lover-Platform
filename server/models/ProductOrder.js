import sequelize from "../database/database.js";

import { DataTypes } from "sequelize";

import Product from "./Product.js";
import Order from "./Order.js";

let tableName = "product_order";

const ProductOrder = sequelize.define(tableName, {
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Order,
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

  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
});

Order.hasMany(ProductOrder, {
  as: "products",
});
ProductOrder.belongsTo(Order);

Product.hasMany(ProductOrder);
ProductOrder.belongsTo(Product);

ProductOrder.sync().then(() => {
  console.log("ProductOrders table created!");
});

export default ProductOrder;
