import express from "express";

import Blog from "../models/Blog.js";
import User from "../models/User.js";
import Post from "../models/Post.js";

import { where, Op } from "sequelize";

import { requireRole } from "../middlewares/auth.js";
import fileUpload from "express-fileupload";

const accept = "accepted";
const reject = "rejected";
const pending = "pending";

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

router.get("/", async (req, res) => {
  const blogs = await Blog.findAll({
    where: {
      status: accept,
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
  if (blogs == null) {
    res.json(NotFoundResponse());
  } else {
    res.json(DataResponse(blogs));
  }
});

router.post("/", requireRole("US"), fileUpload(), async (req, res) => {
  const { title, content } = req.body;
  console.log(title, content);

  const image = req.files.image;
  console.log(image);

  const userId = res.locals.userData.id;
  if (!userId) {
    res.json(UnAuthorizedResponse());
    return;
  }
  const [fileType, fileExt] = image.mimetype.split("/");
  const savePath = `./public/blogImages/${Date.now()}_${title.replace(
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

    let blogs = await Blog.create({
      title: title,
      image: savePath,
      content: content,
      userId: userId,
      postId: post.id,
      status: pending,
    });

    res.json(
      DataResponse({
        id: blogs.id,
        image: savePath,
        content: post.content,
      })
    );
  } catch (err) {
    console.log(err);
    res.json(InternalErrorResponse());
  }
});

router.put("/accept_blog", async (req, res) => {
  const data = req.body;
  console.log(data.id);
  const result = Blog.update(
    {
      status: accept,
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

router.put("/reject_blog", async (req, res) => {
  const data = req.body;
  const result = Blog.update(
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

//=============================Admin===============================================

router.get("/pending_blog", async (req, res) => {
  const pageNo = parseInt(req.query.page_no) || 1;
  const limit = parseInt(req.query.limit) || 6;

  const blogs = await Blog.findAll({
    where: {
      status: pending,
    },
    order: [["createdAt", "DESC"]],
    include: {
      model: Post,
      attributes: ["content", "userId"],
      include: {
        model: User,
        attributes: ["email", "userName"],
      },
    },
  });
  if (blogs == null) {
    res.json(NotFoundResponse());
  } else {
    res.json(DataResponse(blogs));
  }
});

router.get("/acception_blog", async (req, res) => {
  const pageNo = parseInt(req.query.page_no) || 1;
  const limit = parseInt(req.query.limit) || 6;

  const blogs = await Blog.findAll({
    where: {
      status: accept,
    },
    order: [["createdAt", "DESC"]],
    include: {
      model: Post,
      attributes: ["content", "userId"],
      include: {
        model: User,
        attributes: ["email", "userName"],
      },
    },
  });
  if (blogs == null) {
    res.json(NotFoundResponse());
  } else {
    res.json(DataResponse(blogs));
  }
});

router.get("/rejection_blog", async (req, res) => {
  const pageNo = parseInt(req.query.page_no) || 1;
  const limit = parseInt(req.query.limit) || 6;

  const blogs = await Blog.findAll({
    where: {
      status: reject,
    },
    order: [["createdAt", "DESC"]],
    include: {
      model: Post,
      attributes: ["content", "userId"],
      include: {
        model: User,
        attributes: ["email", "userName"],
      },
    },
  });
  if (blogs == null) {
    res.json(NotFoundResponse());
  } else {
    res.json(DataResponse(blogs));
  }
});

router.get("/all_blog", async (req, res) => {
  const pageNo = parseInt(req.query.page_no) || 1;
  const limit = parseInt(req.query.limit) || 6;

  const blogs = await Blog.findAll({
    where: {
      species: "Blog",
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
  if (blogs == null) {
    res.json(NotFoundResponse());
  } else {
    res.json(DataResponse(blogs));
  }
});

router.post("/search_blog", async (req, res) => {
  const { keyword } = req.body;

  console.log(keyword);

  const blogs = await Blog.findAll({
    where: {
      title: { [Op.substring]: keyword },
      status: accept,
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
  if (blogs == null) {
    res.json(DataResponse());
  } else {
    res.json(DataResponse(blogs));
  }
});

router.get("/list_blog", async (req, res) => {
  const pageNo = parseInt(req.query.page_no) || 1;
  const limit = parseInt(req.query.limit) || 12;

  const count = await Blog.count();

  const number = Math.ceil(count / limit);

  const blogs = await Blog.findAll({
    where: {
      status: accept,
    },
    order: [["createdAt", "DESC"]],
    limit: limit,
    offset: (pageNo - 1) * limit,
    include: {
      model: Post,
      attributes: ["content", "userId"],
      include: {
        model: User,
        attributes: ["email", "userName"],
      },
    },
  });
  if (blogs == null) {
    res.json(NotFoundResponse());
  } else {
    res.json(DataResponse(blogs, number));
  }
});

router.put("/invalid_blog", async (req, res) => {
  const data = req.body;
  const result = Blog.update(
    {
      status: reject,
    },
    {
      where: {
        id: data.blogs.id,
      },
    }
  );
  if (result == null) {
    res.json(NotFoundResponse());
  } else {
    res.json(DataResponse(result));
  }
});

router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const blogs = await Blog.findOne({
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
  if (blogs == null) {
    res.json(NotFoundResponse());
  } else {
    res.json(DataResponse(blogs));
  }
});

router.delete("/:id", requireRole("US"), async (req, res, next) => {
  const id = parseInt(req.params.id);

  try {
    const result = await Blog.destroy({
      where: {
        id: id,
      },
    });

    if (result === 0) {
      res.json(NotFoundResponse());
    } else {
      res.json(MessageResponse("Blog deleted successfully!"));
    }
  } catch (err) {
    console.log(err);
    res.json(InternalErrorResponse());
  }
});

router.put("/:id", requireRole("US"), fileUpload(), async (req, res) => {
  const { title, content } = req.body;
  console.log(title, content);

  const id = parseInt(req.params.id);
  const blogData = req.body;

  const image = req.files.image;
  const [fileType, fileExt] = image.mimetype.split("/");

  const savePath = `./public/blogImages/${Date.now()}_${title.replace(
    " ",
    "-"
  )}.${fileExt}`;

  const allowExtensions = ["png", "jpg", "jpeg"];
  if (fileType !== "image" || !allowExtensions.includes(fileExt)) {
    res.json(InvalidTypeResponse());
    return;
  }
  s;
  console.log(savePath);
  image.mv(savePath);

  const result = await Blog.update({
    where: {
      title: blogData.title,
      content: blogData.content,
      image: savePath,
    },
  });

  if (result[0] === 0) {
    res.json(NotFoundResponse());
  } else {
    res.json(MessageResponse("Blog updated successfully!"));
  }
});

router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const blogData = req.body;

  const result = await Blog.update(blogData, {
    where: {
      id: id,
    },
  });
  if (result[0] === 0) {
    res.json(NotFoundResponse());
  } else {
    res.json(MessageResponse("Blog updated successfully!"));
  }
});

export default router;
