import express from "express";

import {
  MessageResponse,
  DataResponse,
  Response,
  InternalErrorResponse,
  NotFoundResponse,
  ErrorResponse,
  UnAuthorizedResponse,
  InvalidTypeResponse
} from "../common/reponses.js";

import { requireRole } from "../middlewares/auth.js";
import fileUpload from "express-fileupload";

const accept = "accepted";
const reject = "rejected";
const pending = "pending";

import { Op } from "sequelize";

import User from "../models/User.js";
import Post from "../models/Post.js";
import Service from "../models/Service.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const services = await Service.findAll({
    include: {
      model: Post,
      attributes: ["userId", "content"],
      include: {
        model: User,
        attributes: ["email", "userName"],
      },
    },
  });
  if (services == null) {
    res.json(NotFoundResponse());
  } else {
    res.json(DataResponse(services));
  }
});

router.post("/", requireRole("US"), fileUpload(), async (req, res) => {
  const { serviceName, servicePrice, content } = req.body;
  console.log(serviceName, servicePrice, content);

  const image = req.files.image;
  console.log(image);

  const userId = res.locals.userData.id;

  const [fileType, fileExt] = image.mimetype.split("/");
  const savePath = `./public/serviceImages/${Date.now()}_${serviceName.replace(
    " ",
    "-"
  )}.${fileExt}`;

  // =================

  const allowExtensions = ["png", "jpg", "jpeg"];
  if (fileType !== "image" || !allowExtensions.includes(fileExt)) {
    res.json(InvalidTypeResponse());
    return;
  }
  console.log(savePath);
  image.mv(savePath);

  try {
    let post = await Post.create({
      content: content,
      userId: userId,
    });
    let service = await Service.create({
      serviceName: serviceName,
      servicePrice: servicePrice,
      content: content,
      image: savePath,
      postId: post.id,
      // status: pending,
    });
    res.json(
      DataResponse({
        id: service.id,
        image: savePath,
        content: post.content,
      })
    );
  } catch (err) {
    console.log(err);
    res.json(InternalErrorResponse());
  }
});

router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  const services = await Service.findOne({
    where: {
      id: id,
    },
  });

  if (services == null) {
    res.json(NotFoundResponse());
  } else {
    res.json(DataResponse(services));
  }
});

//=============================Admin===============================================

router.get("/pending_service", async (req, res) => {
  const pageNo = parseInt(req.query.page_no) || 1;
  const limit = parseInt(req.query.limit) || 6;

  const service = await Service.findAll({
    where: {
      status: pending,
    },
    order: [["createdAt", "DESC"]],
    include: {
      model: Post,
      attributes: ["content", "userId"],
      include: {
        model: User,
        attributes: ["email"],
      },
    },
  });
  if (service == null) {
    res.json(NotFoundResponse());
  } else {
    res.json(DataResponse(service));
  }
});

router.get("/acception_service", async (req, res) => {
  const pageNo = parseInt(req.query.page_no) || 1;
  const limit = parseInt(req.query.limit) || 6;

  const service = await Service.findAll({
    where: {
      status: accept,
    },
    order: [["createdAt", "DESC"]],
    include: {
      model: Post,
      attributes: ["content", "userId"],
      include: {
        model: User,
        attributes: ["email"],
      },
    },
  });
  if (service == null) {
    res.json(NotFoundResponse());
  } else {
    res.json(DataResponse(service));
  }
});

router.get("/rejection_service", async (req, res) => {
  const pageNo = parseInt(req.query.page_no) || 1;
  const limit = parseInt(req.query.limit) || 6;

  const service = await Service.findAll({
    where: {
      status: reject,
    },
    order: [["createdAt", "DESC"]],
    include: {
      model: Post,
      attributes: ["content", "userId"],
      include: {
        model: User,
        attributes: ["email"],
      },
    },
  });
  if (service == null) {
    res.json(NotFoundResponse());
  } else {
    res.json(DataResponse(service));
  }
});

router.put("/accept_service", async (req, res) => {
  const { id } = req.body;

  const result = Service.update(
  {
    status: accept,
  },
  {
    where: {
      id: id,
    },
  }
);

  if (result == null) {
    res.json(NotFoundResponse());
  } else {
    res.json(DataResponse(result));
  }
});

router.put("/reject_service", async (req, res) => {
  const data = req.body;
  
  const result = Service.update(
    {
      status: reject,
      ban: data.note,
    },
    {
      where: {
        id: data.id,
      },
    }
  );
  if (result == null) {
    res.json(NotFoundResponse());
  } else {
    res.json(DataResponse(result));
  }
});

router.get("/all_service", async (req, res) => {
  const pageNo = parseInt(req.query.page_no) || 1;
  const limit = parseInt(req.query.limit) || 6;

  const service = await Service.findAll({
    include: {
      model: Post,
      attributes: ["content", "userId"],
      include: {
        model: User,
        attributes: ["email"],
      },
    },
    order: [["createdAt", "DESC"]],
  });
  if (service == null) {
    res.json(NotFoundResponse());
  } else {
    res.json(DataResponse(service));
  }
});

router.get("/admin/:id", requireRole("US"), async (req, res) => {
  const id = parseInt(req.params.id);
  const service = await Service.findOne({
    where: {
      id: id,
    },
    include: {
      model: Post,
      attributes: ["content", "userId"],
      include: {
        model: User,
        attributes: ["email", "userName"],
      },
    },
  });
  if (service == null) {
    res.json(NotFoundResponse());
  } else {
    res.json(DataResponse(service));
  }
});

export default router;
