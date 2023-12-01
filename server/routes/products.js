import express from "express";
import Product from "../models/Product.js";
import Post from "../models/Post.js";

import {
  MessageResponse,
  DataResponse,
  Response,
  InternalErrorResponse,
  NotFoundResponse,
  ErrorResponse,
  UnAuthorizedResponse,
  InvalidTypeResponse,
} from "../common/reponses.js";

import { requireRole } from "../middlewares/auth.js";
import fileUpload from "express-fileupload";
import User from "../models/User.js";
import { where, Op } from "sequelize";
import sequelize from "../database/database.js";

const router = express.Router();

const accept = "accepted";
const reject = "rejected";
const pending = "pending";

//=============================Product===============================================

router.put("/update_product", requireRole("US"), async (req, res) => {
  const data = req.body;

  const product = await Product.findOne({
    where: {
      id: data.productId,
    },
    include: {
      model: Post,
      attributes: ["id"],
    },
  });
  const number = product.post.dataValues.id;

  const updatedProduct = await product.update({
    productName: data.productName,
    quantity: data.quantity,
    price: data.price,
    size: data.size,
    typeOfPet: data.typeOfPet,
    typeOfProduct: data.typeOfProduct,
  });

  const posts = await Post.update(
    {
      content: data.desc,
    },
    {
      where: {
        id: number,
      },
    }
  );

  if (updatedProduct === 0) {
    res.json(NotFoundResponse());
  } else {
    res.json(MessageResponse("Product updated successfully!"));
  }
});

router.put("/decrease_product", async (req, res) => {
  const productData = req.body;
  console.log(productData);

  productData.products.forEach(async (product) => {
    const default_product = await Product.findOne({
      where: {
        id: product.id,
      },
    });

    await Product.update(
      {
        quantity: default_product.quantity - product.quantity,
      },
      {
        where: { id: product.id },
      }
    );
  });

  res.json(DataResponse(productData));
});

//=============================Home===============================================

router.get("/list_product", async (req, res) => {
  const pageNo = parseInt(req.query.page_no) || 1;
  const limit = parseInt(req.query.limit) || 12;

  const count = await Product.count();

  const number = Math.ceil(count / limit);

  const products = await Product.findAll({
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
  if (products == null) {
    res.json(NotFoundResponse());
  } else {
    res.json(DataResponse(products, number));
  }
});

router.post("/search_product_paging", requireRole("US"), async (req, res) => {
  const { keyword } = req.body;

  const pageNo = parseInt(req.query.page_no) || 1;
  const limit = parseInt(req.query.limit) || 5;

  const product = await Product.findAll({
    limit: limit,
    offset: (pageNo - 1) * limit,
    where: {
      productName: { [Op.substring]: keyword },
      status: accept,
    },
    // include: {
    //   model: Post,
    //   attributes: ["content", "userId"],
    //   include: {
    //     model: User,
    //     attributes: ["email", "userName"],
    //   },
    // },
  });
  if (product == null) {
    res.json(DataResponse());
  } else {
    res.json(DataResponse(product));
  }
});

router.post("/search_product", requireRole("US"), async (req, res) => {
  const { keyword } = req.body;

  const product = await Product.findAll({
    where: {
      productName: { [Op.substring]: keyword },
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
  if (product == null) {
    res.json(DataResponse());
  } else {
    res.json(DataResponse(product));
  }
});

//=============================Profile===============================================

router.get("/", async (req, res) => {
  const products = await Product.findAll({
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
  if (products == null) {
    res.json(NotFoundResponse());
  } else {
    res.json(DataResponse(products));
  }
});

router.post("/userProduct", requireRole("US"), async (req, res) => {
  const id = req.body.id;

  console.log(id);
  const posts = await Post.findAll({
    where: {
      userId: id,
    },
    order: [["createdAt", "DESC"]],
    include: {
      model: Product,
      where: {
        id: sequelize.col("product.id"),
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

//=============================Admin===============================================

router.get("/pending_product", async (req, res) => {
  const pageNo = parseInt(req.query.page_no) || 1;
  const limit = parseInt(req.query.limit) || 6;

  const product = await Product.findAll({
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
  if (product == null) {
    res.json(NotFoundResponse());
  } else {
    res.json(DataResponse(product));
  }
});

router.get("/acception_product", async (req, res) => {
  const pageNo = parseInt(req.query.page_no) || 1;
  const limit = parseInt(req.query.limit) || 6;

  const product = await Product.findAll({
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
  if (product == null) {
    res.json(NotFoundResponse());
  } else {
    res.json(DataResponse(product));
  }
});

router.get("/rejection_product", async (req, res) => {
  const pageNo = parseInt(req.query.page_no) || 1;
  const limit = parseInt(req.query.limit) || 6;

  const product = await Product.findAll({
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
  if (product == null) {
    res.json(NotFoundResponse());
  } else {
    res.json(DataResponse(product));
  }
});

router.put("/accept_product", async (req, res) => {
  const { id } = req.body;
  const result = Product.update(
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

router.put("/reject_product", async (req, res) => {
  const data = req.body;
  const result = Product.update(
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

router.get("/all_product", async (req, res) => {
  const pageNo = parseInt(req.query.page_no) || 1;
  const limit = parseInt(req.query.limit) || 6;

  const product = await Product.findAll({
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
  if (product == null) {
    res.json(NotFoundResponse());
  } else {
    res.json(DataResponse(product));
  }
});

router.post("/", requireRole("US"), fileUpload(), async (req, res) => {
  const {
    productName,
    description,
    price,
    size,
    typeOfPet,
    typeOfProduct,
    quantity,
  } = req.body;
  console.log(
    productName,
    description,
    price,
    size,
    typeOfPet,
    typeOfProduct,
    quantity
  );
  const image = req.files.image;
  console.log(image);
  // console.log("req.body: ", req.body);
  // console.log("req.file: ", req.file);
  const userId = res.locals.userData.id;
  const [fileType, fileExt] = image.mimetype.split("/");
  const savePath = `./public/productImages/${Date.now()}_${productName.replace(
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
      content: description,
      userId: userId,
    });
    let product = await Product.create({
      productName: productName,
      image: savePath,
      description: description,
      price: price,
      size: size,
      typeOfPet: typeOfPet,
      typeofProduct: typeOfProduct,
      quantity: quantity,
      postId: post.id,
      status: pending,
    });
    res.json(
      DataResponse({
        id: product.id,
        image: savePath,
        content: post.content,
      })
    );
  } catch (err) {
    console.log(err);
    res.json(InternalErrorResponse());
  }
});

//======================================ManagePost===========================================================

router.post("/pending/manage_product", async (req, res) => {
  const id = req.body.id;

  const posts = await Post.findAll({
    where: {
      userId: id,
    },
    order: [["createdAt", "DESC"]],
    include: {
      model: Product,
      where: {
        id: sequelize.col("product.id"),
        status: "pending",
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

router.post("/accepted/manage_product", async (req, res) => {
  const id = req.body.id;

  const posts = await Post.findAll({
    where: {
      userId: id,
    },
    order: [["createdAt", "DESC"]],
    include: {
      model: Product,
      where: {
        id: sequelize.col("product.id"),
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
router.post("/rejected/manage_product", async (req, res) => {
  const id = req.body.id;

  const posts = await Post.findAll({
    where: {
      userId: id,
    },
    order: [["createdAt", "DESC"]],
    include: {
      model: Product,
      where: {
        id: sequelize.col("product.id"),
        status: "rejected",
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
//===========================================================================================================

router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const product = await Product.findOne({
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
  if (product == null) {
    res.json(NotFoundResponse());
  } else {
    res.json(DataResponse(product));
  }
});

router.get("/admin/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const product = await Product.findOne({
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
  if (product == null) {
    res.json(NotFoundResponse());
  } else {
    res.json(DataResponse(product));
  }
});

export default router;
