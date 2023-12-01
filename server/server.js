// ===== Imports =====
import "dotenv/config.js";

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";

import "./database/database.js";

import passport from "passport";

import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { Strategy as FacebookStrategy } from "passport-facebook";

import overwriteResponseJSON from "./middlewares/overwriteResponseJSON.js";

import indexRouter from "./routes/index.js";
import userRouter from "./routes/users.js";
import postRouter from "./routes/posts.js";
import petRouter from "./routes/pets.js";
import productRouter from "./routes/products.js";
import serviceRouter from "./routes/services.js";
import discountRouter from "./routes/discounts.js";
import deliveryRouter from "./routes/deliveries.js";
import orderRouter from "./routes/orders.js";
import bookingRouter from "./routes/bookings.js";
import productOrderRouter from "./routes/productOrders.js";
import feedbackRouter from "./routes/feedbacks.js";
import notificationRouter from "./routes/notifications.js";
import messageRouter from "./routes/messages.js";
import giftRouter from "./routes/gifts.js";
import blogRouter from "./routes/blogs.js";

import vnpayRouter from "./routes/vnpay.js";

import authRouter from "./routes/auth.js";

// ===== Config =====
const server = express();
const PORT = process.env.PORT || 3000;

// ===== Middlewares =====
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.SERVER_URL}/auth/google/callback`,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      console.log(profile);
      done(null, profile);
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: `${process.env.SERVER_URL}/auth/facebook/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      done(null, profile);
    }
  )
);

server.use(passport.initialize());

server.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(overwriteResponseJSON);
server.use(cookieParser());
server.use("/public", express.static("public"));
server.use("/public", express.static("public/images"));

// ===== Routes =====
server.use("/", indexRouter);
server.use("/users", userRouter);
server.use("/posts", postRouter);
server.use("/pets", petRouter);
server.use("/services", serviceRouter);
server.use("/products", productRouter);
server.use("/discounts", discountRouter);
server.use("/deliveries", deliveryRouter);
server.use("/orders", orderRouter);
server.use("/bookings", bookingRouter);
server.use("/feedbacks", feedbackRouter);
server.use("/notifications", notificationRouter);
server.use("/messages", messageRouter);
server.use("/productOrders", productOrderRouter);
server.use("/gifts", giftRouter);
server.use("/blogs", blogRouter);

server.use("/vnpay", vnpayRouter);

server.use("/auth", authRouter);

const serverInstance = server.listen(PORT, () => {
  console.log(`Server is listening at PORT=${PORT}`);
});

// initWebSocket(serverInstance);
