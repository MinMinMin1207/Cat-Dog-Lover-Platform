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
import sequelize from "../database/database.js";

import Service from "../models/Service.js";
import Booking from "../models/Booking.js";
import Post from "../models/Post.js";
import User from "../models/User.js";

const accept = "accepted";
const reject = "rejected";
const pending = "pending";

const router = express.Router();

router.get("/", async (req, res) => {
  const bookings = await Booking.findAll({
    where: {
      status: "pending",
    },
  });

  console.log("Service data:", bookings);

  if (bookings == null) {
    res.json(NotFoundResponse());
  } else {
    res.json(DataResponse(bookings));
  }
});

//====================================ManagePost===================================

router.post("/pending/manage_service", async (req, res) => {
  const id = req.body.id;

  console.log(id);

  const books = await Booking.findAll({
    where: {
      id: id,
      status: "pending",
    },
    order: [["createdAt", "DESC"]],
    // include: {
    //   model: Service,
    //   where: {
    //     id: sequelize.col("service.id"),
    //     status: "pending",
    //   },
    // },
  });

  console.log(books);
  if (books == null) {
    res.json(NotFoundResponse());
  } else {
    res.json(DataResponse(books.reverse()));
  }
});

router.get("/pending_book_user/:id", async (req, res) => {
  const pageNo = parseInt(req.query.page_no) || 1;
  const limit = parseInt(req.query.limit) || 6;
 
  const id = parseInt(req.params.id);
 
  const books = await Booking.findAll({
    where: {
      customerId: id,
      status: pending,
    },
    order: [["createdAt", "DESC"]],
    include: {
      model: Service,
      attributes: ["serviceName"],
      // include: {
      //   model: User,
      //   attributes: ["email", "customerId"],
      // },
    },
  });
  if (books == null) {
    res.json(NotFoundResponse());
  } else {
    res.json(DataResponse(books));
  }
});

router.post("/accepted/manage_service", async (req, res) => {
  const id = req.body.id;
  console.log(id);

  const books = await Booking.findAll({
    where: {
      id: id,
      status: "accepted",
    },
    order: [["createdAt", "DESC"]],
    // include: {
    //   model: Service,
    //   where: {
    //     id: sequelize.col("service.id"),
    //     status: "accepted",
    //   },
    // },
  });

  console.log(books);
  if (books == null) {
    res.json(NotFoundResponse());
  } else {
    res.json(DataResponse(books.reverse()));
  }
});

router.post("/rejected/manage_service", async (req, res) => {
  const id = req.body.id;

  const books = await Booking.findAll({
    where: {
      id: id,
      status: "rejected",
    },
    order: [["createdAt", "DESC"]],
    // include: {
    //   model: Service,
    //   where: {
    //     id: sequelize.col("service.id"),
    //     status: "rejected",
    //   },
    // },
  });

  console.log(books);
  if (books == null) {
    res.json(NotFoundResponse());
  } else {
    res.json(DataResponse(books.reverse()));
  }
});

router.get("/pending_booking", async (req, res) => {
  const pageNo = parseInt(req.query.page_no) || 1;
  const limit = parseInt(req.query.limit) || 6;

  const books = await Booking.findAll({
    where: {
      status: "pending",
    },
    order: [["createdAt", "DESC"]],
    include: {
      model: Service,
      attributes: ["serviceName"],
    },
  });
  if (books == null) {
    res.json(NotFoundResponse());
  } else {
    res.json(DataResponse(books));
  }
});

router.get("/acception_booking", async (req, res) => {
  const pageNo = parseInt(req.query.page_no) || 1;
  const limit = parseInt(req.query.limit) || 6;

  const books = await Booking.findAll({
    where: {
      status: "accepted",
    },
    order: [["createdAt", "DESC"]],
    include: {
      model: Service,
      attributes: ["serviceName"],
    },
  });
  if (books == null) {
    res.json(NotFoundResponse());
  } else {
    res.json(DataResponse(books));
  }
});

router.get("/rejection_booking", async (req, res) => {
  const pageNo = parseInt(req.query.page_no) || 1;
  const limit = parseInt(req.query.limit) || 6;

  const books = await Booking.findAll({
    where: {
      status: "rejected",
    },
    order: [["createdAt", "DESC"]],
    include: {
      model: Service,
      attributes: ["serviceName"],
    },
  });
  if (books == null) {
    res.json(NotFoundResponse());
  } else {
    res.json(DataResponse(books));
  }
});

router.put("/accept_booking", async (req, res) => {
  const { id } = req.body;
  const result = Booking.update(
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

router.put("/reject_booking", async (req, res) => {
  const data = req.body;
  const result = Booking.update(
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

router.get("/all_booking", async (req, res) => {
  const pageNo = parseInt(req.query.page_no) || 1;
  const limit = parseInt(req.query.limit) || 6;

  const books = await Booking.findAll({
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
  if (books == null) {
    res.json(NotFoundResponse());
  } else {
    res.json(DataResponse(books));
  }
});

router.get("/pending_book_user/:id", async (req, res) => {
  const pageNo = parseInt(req.query.page_no) || 1;
  const limit = parseInt(req.query.limit) || 6;

  const id = parseInt(req.params.id);

  const books = await Booking.findAll({
    where: {
      customerId: id,
      status: pending,
    },
    order: [["createdAt", "DESC"]],
    include: {
      model: Service,
      attributes: ["serviceName"],
      // include: {
      //   model: User,
      //   attributes: ["email", "customerId"],
      // },
    },
  });
  if (books == null) {
    res.json(NotFoundResponse());
  } else {
    res.json(DataResponse(books));
  }
});

router.get("/accept_book_user/:id", async (req, res) => {
  const pageNo = parseInt(req.query.page_no) || 1;
  const limit = parseInt(req.query.limit) || 6;

  const id = parseInt(req.params.id);

  const books = await Booking.findAll({
    where: {
      customerId: id,
      status: "accepted",
    },
    order: [["createdAt", "DESC"]],
    include: {
      model: Service,
      attributes: ["serviceName"],
    },
  });
  if (books == null) {
    res.json(NotFoundResponse());
  } else {
    res.json(DataResponse(books));
  }
});

router.get("/reject_book_user/:id", async (req, res) => {
  const pageNo = parseInt(req.query.page_no) || 1;
  const limit = parseInt(req.query.limit) || 6;

  const id = parseInt(req.params.id);

  const books = await Booking.findAll({
    where: {
      customerId: id,
      status: "rejected",
    },
    order: [["createdAt", "DESC"]],
    include: {
      model: Service,
      attributes: ["serviceName"],
    },
  });
  if (books == null) {
    res.json(NotFoundResponse());
  } else {
    res.json(DataResponse(books));
  }
});

router.get("/:id", requireRole("US"), async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const book = await Booking.findOne({
      where: {
        id: id,
      },
      include: {
        model: Service,
        attributes: ["serviceName", "servicePrice"],
      },
    });

    res.json(DataResponse(book));
  } catch (err) {
    console.log(err);
    res.json(InternalErrorResponse());
  }
});

router.post("/", requireRole("US"), async (req, res) => {
  try {
    const {
      serviceName,
      paymentMethod,
      serviceId,
      fullName,
      phoneNumber,
      bookDate,
      bookTime,
      note,
    } = req.body;

    const customerId = req.body.customerId;
    console.log(req.body.customerId);

    const book = await Booking.create({
      serviceName,
      paymentMethod,
      note,
      fullName,
      phoneNumber,
      bookDate,
      bookTime,
      serviceId,
      customerId,
      status: "pending"
    });

    res.json(DataResponse(book));
  } catch (error) {
    console.error(error);
    res.json(InternalErrorResponse());
  }
});

export default router;
