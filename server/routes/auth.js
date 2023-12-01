import express from "express";
import passport from "passport";

import User from "../models/User.js";

import { DataResponse } from "../common/reponses.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
    session: false,
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
  }),
  async (req, res) => {
    console.log(req.user);
    const profile = req.user;

    const [user, created] = await User.findOrCreate({
      where: { email: profile.email },
      defaults: {
        email: profile.email,
        username: profile.email,
        password: "",
      },
    });
    // res.send("Google authenticated")

    const payload = {
      id: user.id,
      email: profile.email,
      username: user.userName,
      role: user.role,
    };
    const token = jwt.sign(payload, process.env.SECRET, {
      expiresIn: "3h",
    });
    console.log(user);
    console.log(user.userName);
    if (user.userName) {
      res.cookie("token", token);
      res.redirect(`${process.env.CLIENT_URL}/home`);
    } else {
      res.cookie("token", token);
      res.redirect(`${process.env.CLIENT_URL}/register`);
    }
  }
);

router.get(
  '/auth/facebook',
  passport.authenticate('facebook', {
    session: false,
    scope: ['email', 'user_posts']
  })
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    session: false,
  }),
  async (req, res) => {
    console.log(req.user);
    const profile = req.user;

    const [user, created] = await User.findOrCreate({
      where: { 
        email: profile.email 
      },
      defaults: {
        email: profile.email,
        // username: profile.email,
        password: "",
      },
    });

    const payload = {
      id: user.id,
      email: profile.email,
      //   username: user.email,
      role: user.role,
    };
    const token = jwt.sign(payload, process.env.SECRET, {
      expiresIn: "3h",
    });

    if (user.userName) {
      res.cookie("token", token);
      res.redirect(`${process.env.CLIENT_URL}/home`);
    } else {
      res.cookie("token", token);
      res.redirect(`${process.env.CLIENT_URL}/register`);
    }
  }
);

export default router;
