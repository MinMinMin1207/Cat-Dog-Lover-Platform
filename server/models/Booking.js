import sequelize from "../database/database.js";

import { DataTypes } from "sequelize";
import SQLModel from "../common/SQLModel.js";

import Service from "./Service.js";
import User from "./User.js";

let tableName = "bookings";

const Booking = sequelize.define(tableName, {
  paymentMethod: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  serviceName: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  phoneNumber: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  note: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bookTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  bookDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  ban: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  serviceId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Service,
      key: "id",
    },
  },
  customerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },

  ...SQLModel,
});

User.hasOne(Booking);
Booking.belongsTo(User);

Service.hasOne(Booking);
Booking.belongsTo(Service);

Booking.sync().then(() => {
  console.log("Bookings table created!");
});

export default Booking;
