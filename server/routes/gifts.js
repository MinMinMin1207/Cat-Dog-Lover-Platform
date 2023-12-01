import express from "express";

import {
  MessageResponse,
  DataResponse,
  Response,
  InternalErrorResponse,
  NotFoundResponse,
  ErrorResponse,
  UnAuthorizedResponse,
} from "../common/reponses.js";

import { requireRole } from "../middlewares/auth.js";
import User from "../models/User.js";
import Order from "../models/Order.js";
import Post from "../models/Post.js";
import Pet from "../models/Pet.js";
import sequelize from "../database/database.js";
import { Op } from "sequelize";

const router = express.Router();

router.get("/", async (req, res) => {
  const pets = await Pet.findAll({
    where: {
      petPrice: 0,
      status: "accepted",
    },
    include: {
      model: Post,
      attributes: ["content", "userId"],
      include: {
        model: User,
        attributes: ["email"],
      },
    },
  });
  if (pets == null) {
    res.json(NotFoundResponse());
  } else {
    res.json(DataResponse(pets));
  }
});

router.post("/userGift", requireRole("US"), async (req, res) => {
  const id = req.body.id;

  const posts = await Post.findAll({
    where: {
      userId: id,
    },
    include: {
      model: Pet,
      where: {
        id: sequelize.col("pet.id"),
        petPrice: 0,
        status: "accepted",
      },
    },
  });

  console.log(posts);
  if (posts == null) {
    res.json(NotFoundResponse());
  } else {
    res.json(DataResponse(posts));
  }
});

router.post("/pending_gift", requireRole("US"), async (req, res) => {
  const data = req.body;

  const order = await Order.findAll({
    where: {
      PaymentMethod: "pending",
      userId: data.id,
      status: "pending",
    },
    include: {
      model: Pet,
    },
  });

  if (order == null) {
    res.json(NotFoundResponse());
  } else {
    res.json(DataResponse(order));
  }
});

router.post("/accepted_gift", requireRole("US"), async (req, res) => {
  const data = req.body;

  const order = await Order.findAll({
    where: {
      PaymentMethod: "pending",
      userId: data.id,
      status: "accepted",
    },
    include: {
      model: Pet,
    },
  });

  if (order == null) {
    res.json(NotFoundResponse());
  } else {
    res.json(DataResponse(order));
  }
});

router.post("/rejected_gift", requireRole("US"), async (req, res) => {
  const data = req.body;

  const order = await Order.findAll({
    where: {
      PaymentMethod: "pending",
      userId: data.id,
      status: "rejected",
    },
    include: {
      model: Pet,
    },
  });

  if (order == null) {
    res.json(NotFoundResponse());
  } else {
    res.json(DataResponse(order));
  }
});

router.put("/accepted_gift", requireRole("US"), async (req, res) => {
  const data = req.body;

  const order = await Order.update(
    {
      status: "accepted",
    },
    {
      where: {
        id: data.id,
      },
    }
  );

  const result = await Order.update(
    {
      status: "rejected",
    },
    {
      where: {
        petId: data.petId,
        id: { [Op.not]: data.id },
      },
    }
  );
  if (order == null) {
    res.json(NotFoundResponse());
  } else {
    res.json(DataResponse(order));
  }
});

export default router;
