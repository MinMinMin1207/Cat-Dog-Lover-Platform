import express from "express";
import Message from "../models/Message.js";
import User from "../models/User.js";

import { MessageResponse, DataResponse, Response, InternalErrorResponse, NotFoundResponse, ErrorResponse, UnAuthorizedResponse } from '../common/reponses.js'

const router = express.Router();

router.get("/:roomName", async (req, res) => {
  const messages = await Message.findAll({
    where: { roomName: req.params.roomName },

    include: {
      model: User,
      as: "sender",
      attributes: ["id", "username", "role"],
    },
  });
  console.log(messages);
  res.json(DataResponse(messages));
});

export default router;
