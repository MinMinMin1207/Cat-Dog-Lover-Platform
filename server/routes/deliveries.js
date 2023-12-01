import express from "express";
import Delivery from "../models/Delivery.js";

import { requireRole } from "../middlewares/auth.js";

import {
  MessageResponse,
  DataResponse,
  Response,
  InternalErrorResponse,
  NotFoundResponse,
  ErrorResponse,
  UnAuthorizedResponse,
} from "../common/reponses.js";

const router = express.Router();

// router.get("/", async (req, res) => {
//   const deliveries = await Delivery.findAll();
//   res.json(DataResponse(deliveries));
// });

router.get("/", requireRole("US"), async (req, res) => {
  // const id = parseInt(req.params.id);
  const userId = res.locals.userData.id;

  const deliveries = await Delivery.findAll({
    where: {
      userId: userId,
    },
  });
  res.json(DataResponse(deliveries));
});

router.get("/pet", requireRole("US"), async (req, res) => {
  // const id = parseInt(req.params.id);
  const userId = res.locals.userData.id;

  const deliveries = await Delivery.findOne({
    where: {
      userId: userId,
    },
  });
  res.json(DataResponse(deliveries));
});

router.post("/", requireRole("US"), async (req, res) => {
  const deliveryData = req.body;
  const userId = res.locals.userData.id;

  console.log(
    deliveryData.receiverName,
    deliveryData.receiverPhone,
    deliveryData.receiverAddress
  );
  try {
    const delivery = await Delivery.create({
      receiverName: deliveryData.receiverName,
      receiverAddress: deliveryData.receiverAddress,
      receiverPhone: deliveryData.receiverPhone,
      userId: userId,
    });

    res.json(
      DataResponse({
        id: delivery.id,
      })
    );
  } catch (err) {
    console.log(err);
    res.json(InternalErrorResponse());
  }
});

router.post("/delete", requireRole("US"), async (req, res) => {
  const { id } = req.body;
  console.log(id);
  const deliveries = await Delivery.destroy({
    where: {
      id: id,
    },
  });
  if (deliveries) {
    res.json(DataResponse("success"));
  } else {
    res.json(DataResponse("fail"));
  }
});

export default router;
