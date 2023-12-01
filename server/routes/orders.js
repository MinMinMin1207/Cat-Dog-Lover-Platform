import express from "express";
import { requireRole } from "../middlewares/auth.js";
import Order from "../models/Order.js";
import ProductOrder from "../models/ProductOrder.js";
import { Op } from "sequelize";
import sequelize from "../database/database.js";

import {
  MessageResponse,
  DataResponse,
  Response,
  InternalErrorResponse,
  NotFoundResponse,
  ErrorResponse,
  UnAuthorizedResponse,
} from "../common/reponses.js";

import Delivery from "../models/Delivery.js";
import Product from "../models/Product.js";
import Post from "../models/Post.js";
import Pet from "../models/Pet.js";
import User from "../models/User.js";

const router = express.Router();

router.get("/list_order", requireRole("US"), async (Req, res) => {
  const userId = res.locals.userData.id;

  const order = await Order.findAll({
    where: {
      userId: userId,
      petId: null,
    },
    order: [["createdAt", "DESC"]],
  });
  const list = order.map((item) => item.dataValues.id);
  console.log(list);

  // const temp = list.map(async (item) => {
  //   // console.log(item);
  const temp = await ProductOrder.findAll({
    where: {
      orderId: list,
    },
    include: {
      model: Product,
      attributes: ["productName", "price"],
      include: {
        model: Post,
        attributes: ["content", "userId"],
        include: {
          model: User,
          attributes: ["email", "userName"],
        },
      },
    },
  });

  // const temp = await ProductOrder.findOne({
  //   where: {
  //     orderId: list[0],
  //   },
  //   include: {
  //     model: Product,
  //     attributes: ["productName", "price"],
  //   },
  // });

  console.log(temp);
  res.json(DataResponse(order, temp));
});

router.get("/list_pet_order", requireRole("US"), async (Req, res) => {
  const userId = res.locals.userData.id;

  const order = await Order.findAll({
    where: {
      userId: userId,
      petId: { [Op.not]: null },
    },
    order: [["createdAt", "DESC"]],
    include: {
      model: Pet,
      attributes: ["petName", "petPrice", "breed", "species"],
      // include: {
      //   model: User,
      //   attributes: ["email"],
      // },
    },
  });
  res.json(DataResponse(order));
});

router.get("/chart_order", async (req, res) => {
  const order = await Order.findAll({});

  let list = order.map((item) =>
    item.dataValues.createdAt.toJSON().slice(0, 7)
  );
  console.log(list);

  let count = 1;
  let flag = list[0];
  const arr = [];

  for (let i = 0; i < list.length; i++) {
    if (flag === list[i + 1]) {
      count++;
    } else {
      arr.push({
        date: list[i],
        count: count,
      });
      count = 1;
      flag = list[i + 1];
    }
  }
  console.log(arr);
  res.json(DataResponse(arr));
});

router.post("/productOrder", requireRole("US"), async (req, res) => {
  const orderData = req.body;
  const userId = res.locals.userData.id;

  // console.log(
  //   orderData.Note,
  //   orderData.deliveryId,
  //   orderData.paymentMethod,
  //   orderData.products,
  //   orderData.ship
  // );

  try {
    const order = await Order.create({
      deliveryId: orderData.deliveryId,
      userId: userId,
      note: orderData.Note,
      paymentMethod: orderData.paymentMethod,
      ship: orderData.ship,
      status: "pending",
    });

    orderData.products.forEach(async (product) => {
      await ProductOrder.create({
        productId: product.id,
        quantity: product.quantity,
        orderId: order.id,
      });
    });

    res.json(
      DataResponse({
        orderId: order.id,
      })
    );
  } catch (err) {
    console.log(err);
    res.json(InternalErrorResponse());
  }
});

router.post("/petOrder", requireRole("US"), async (req, res) => {
  const orderData = req.body;
  const userId = res.locals.userData.id;

  console.log(
    orderData.Note,
    orderData.deliveryId,
    orderData.paymentMethod,
    orderData.products,
    orderData.ship
  );

  try {
    const order = await Order.create({
      deliveryId: orderData.deliveryId,
      userId: userId,
      note: orderData.Note,
      paymentMethod: orderData.paymentMethod,
      ship: orderData.ship,
      petId: orderData.products.id,
      status: "pending",
    });

    res.json(
      DataResponse({
        orderId: order.id,
      })
    );
  } catch (err) {
    console.log(err);
    res.json(InternalErrorResponse());
  }
});

//=======================================OrderGift===========================================================

router.post("/giftOrder", requireRole("US"), async (req, res) => {
  const orderData = req.body;
  const userId = res.locals.userData.id;

  console.log(
    orderData.note,
    // orderData.deliveryId,
    // orderData.paymentMethod,
    // orderData.ship,
    orderData.products
  );

  try {
    const order = await Order.create({
      // deliveryId: orderData.deliveryId,
      userId: userId,
      note: orderData.note,
      // paymentMethod: orderData.paymentMethod,
      // ship: orderData.ship,
      petId: orderData.petId,
      // petId: orderData.id,
      status: "pending",
      paymentMethod: "pending",
    });

    res.json(
      DataResponse({
        orderId: order.id,
      })
    );
  } catch (err) {
    console.log(err);
    res.json(InternalErrorResponse());
  }
});

router.post("/ownerGift", requireRole("US"), async (req, res) => {
  const data = req.body;

  console.log(data.id);

  const posts = await Post.findAll({
    where: {
      userId: data.id,
    },
    order: [["createdAt", "DESC"]],
    include: {
      model: Pet,
      where: {
        id: sequelize.col("pet.id"),
        petPrice: 0,
      },
    },
  });

  // console.log(posts);

  const list = posts.map((item) => item.dataValues.pet);
  const list2 = list.map((item) => item.dataValues.id);

  const order = await Order.findAll({
    where: {
      petId: list2,
      status: "pending",
    },
    include: {
      model: User,
    },
  });

  console.log(list2);

  if (posts == null) {
    res.json(NotFoundResponse());
  } else {
    res.json(DataResponse(posts, order));
  }
});

router.post("/adopterGift", requireRole("US"), async (req, res) => {
  const id = req.body.id;

  const order = Order.findAll({
    where: {
      userId: id,
      paymentMethod: "pending",
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

//=======================================setStatus============================================================

router.put("/pakaged_order", requireRole("US"), async (req, res) => {
  const data = req.body;

  const order = await Order.update(
    {
      status: "packaged",
    },
    {
      where: {
        id: data.id,
      },
    }
  );
  if (order == null) {
    res.json(NotFoundResponse());
  } else {
    res.json(DataResponse(order));
  }
});

router.put("/delivered_order", requireRole("US"), async (req, res) => {
  const data = req.body;

  const order = await Order.update(
    {
      status: "delivered",
    },
    {
      where: {
        id: data.id,
      },
    }
  );
  if (order == null) {
    res.json(NotFoundResponse());
  } else {
    res.json(DataResponse(order));
  }
});

router.put("/done_order", requireRole("US"), async (req, res) => {
  const data = req.body;

  const order = await Order.update(
    {
      status: "done",
    },
    {
      where: {
        id: data.id,
      },
    }
  );
  if (order == null) {
    res.json(NotFoundResponse());
  } else {
    res.json(DataResponse(order));
  }
});

//=================================ManageShopOrder=============================================================

router.post("/manage_shop_order/done", requireRole("US"), async (req, res) => {
  const data = req.body;

  try {
    const temp = await ProductOrder.findAll({
      include: {
        model: Product,
        attributes: ["productName", "price"],
        include: {
          model: Post,
          attributes: ["content", "userId"],
          where: {
            userId: data.id,
          },
          order: [["createdAt", "DESC"]],
        },
      },
    });

    // let list = temp.map((item) => {
    //   if (item.product !== null) return item.id;
    // });

    let list = temp.filter((item) => item.product !== null);
    let list_id = list.map((item) => item.orderId);

    const order = await Order.findAll({
      where: {
        id: list_id,
        status: "done",
      },
    });

    const ds = order.map((item) => item.dataValues.id);
    console.log(ds);

    const result = await ProductOrder.findAll({
      where: {
        orderId: ds,
      },
      include: {
        model: Product,
        attributes: ["productName", "price"],
        include: {
          model: Post,
          attributes: ["content", "userId"],
          include: {
            model: User,
            attributes: ["email", "userName"],
          },
        },
      },
    });

    res.json(DataResponse(order, result));
  } catch (error) {
    console.log(error);
    res.json(InternalErrorResponse());
  }
});

router.post(
  "/manage_shop_order/pending",
  requireRole("US"),
  async (req, res) => {
    const data = req.body;

    try {
      const temp = await ProductOrder.findAll({
        include: {
          model: Product,
          attributes: ["productName", "price"],
          include: {
            model: Post,
            attributes: ["content", "userId"],
            where: {
              userId: data.id,
            },
            order: [["createdAt", "DESC"]],
          },
        },
      });

      // let list = temp.map((item) => {
      //   if (item.product !== null) return item.id;
      // });

      let list = temp.filter((item) => item.product !== null);
      let list_id = list.map((item) => item.orderId);

      const order = await Order.findAll({
        where: {
          id: list_id,
          status: { [Op.not]: "done" },
        },
      });

      const ds = order.map((item) => item.dataValues.id);
      console.log(ds);

      const result = await ProductOrder.findAll({
        where: {
          orderId: ds,
        },
        include: {
          model: Product,
          attributes: ["productName", "price"],
          include: {
            model: Post,
            attributes: ["content", "userId"],
            include: {
              model: User,
              attributes: ["email", "userName"],
            },
          },
        },
      });

      res.json(DataResponse(order, result));
    } catch (error) {
      console.log(error);
      res.json(InternalErrorResponse());
    }
  }
);

router.post("/manage_pet_order/done", requireRole("US"), async (req, res) => {
  const data = req.body;

  const pet = await Pet.findAll({
    where: {
      status: "sold",
    },
    include: {
      model: Post,
      attributes: ["content", "userId"],
      where: {
        userId: data.id,
      },
      order: [["createdAt", "DESC"]],
    },
  });

  const list = pet.map((item) => item.dataValues.id);

  const order = await Order.findAll({
    where: {
      petId: list,
      status: "done",
    },
  });

  if (pet == null) {
    res.json(NotFoundResponse());
  } else {
    res.json(DataResponse(pet, order));
  }
});

router.post(
  "/manage_pet_order/pending",
  requireRole("US"),
  async (req, res) => {
    const data = req.body;

    const pet = await Pet.findAll({
      where: {
        status: "sold",
      },
      include: {
        model: Post,
        attributes: ["content", "userId"],
        where: {
          userId: data.id,
        },
        order: [["createdAt", "DESC"]],
      },
    });

    const list = pet.map((item) => item.dataValues.id);

    const order = await Order.findAll({
      where: {
        petId: list,
        status: { [Op.not]: "done" },
      },
    });

    if (pet == null) {
      res.json(NotFoundResponse());
    } else {
      res.json(DataResponse(pet, order));
    }
  }
);

//=================================Admin=======================================================================
// router.get("/income", requireRole("SF"), async (req, res) => {
//   const users = await User.findAll();

//   const listUser = users.map((item) => item.dataValues.id);
//   // console.log(listUser);

//   const result = listUser.map((element) => {
//     countOrder(element);
//   });

//   async function countOrder(item) {
//     const temp = await ProductOrder.findAll({
//       include: {
//         model: Product,
//         attributes: ["productName", "price"],
//         include: {
//           model: Post,
//           attributes: ["content", "userId"],
//           where: {
//             userId: item,
//           },
//         },
//       },
//     });

//     // let list = temp.map((item) => {
//     //   if (item.product !== null) return item.id;
//     // });

//     let list = temp.filter((item) => item.product !== null);
//     let list_id = list.map((item) => item.orderId);

//     const { count, orders } = await Order.findAndCountAll({
//       where: {
//         id: list_id,
//         status: "done",
//       },
//     });

//     // return count;
//     console.log(count);
//     // await console.log(count);
//   }
//   await console.log(result);
//   res.json(DataResponse(users));
// });

router.get("/manage_order/admin/done", requireRole("US"), async (req, res) => {
  try {
    const temp = await ProductOrder.findAll({
      include: {
        model: Product,
        attributes: ["productName", "price"],
        include: {
          model: Post,
          attributes: ["content", "userId"],
        },
        order: [["createdAt", "DESC"]],
      },
    });

    // let list = temp.map((item) => {
    //   if (item.product !== null) return item.id;
    // });

    let list = temp.filter((item) => item.product !== null);
    let list_id = list.map((item) => item.orderId);

    const order = await Order.findAll({
      where: {
        id: list_id,
        status: "done",
      },
    });

    const ds = order.map((item) => item.dataValues.id);
    console.log(ds);

    const result = await ProductOrder.findAll({
      where: {
        orderId: ds,
      },
      include: {
        model: Product,
        attributes: ["productName", "price"],
        include: {
          model: Post,
          attributes: ["content", "userId"],
          include: {
            model: User,
            attributes: ["email", "userName"],
          },
        },
      },
    });

    res.json(DataResponse(order, result));
  } catch (error) {
    console.log(error);
    res.json(InternalErrorResponse());
  }
});

router.get(
  "/manage_pet_order/admin/done",
  requireRole("US"),
  async (req, res) => {
    const pet = await Pet.findAll({
      where: {
        status: "sold",
      },
      include: {
        model: Post,
        attributes: ["content", "userId"],
        order: [["createdAt", "DESC"]],
      },
    });

    const list = pet.map((item) => item.dataValues.id);

    const order = await Order.findAll({
      where: {
        petId: list,
        status: "done",
      },
    });

    if (pet == null) {
      res.json(NotFoundResponse());
    } else {
      res.json(DataResponse(pet, order));
    }
  }
);

//=============================================================================================================

router.get("/productOrder/:id", requireRole("US"), async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const order = await Order.findOne({
      where: {
        id: id,
      },
      include: {
        model: Delivery,
        attributes: ["receiverName", "receiverAddress", "receiverPhone"],
      },
      // include: {
      //   model: Pet,
      //   attributes: ["petName", "petPrice"],
      // },
    });

    const product_order = await ProductOrder.findAll({
      where: {
        orderId: id,
      },
      include: {
        model: Product,
        attributes: ["productName", "price", "postId"],
        include: {
          model: Post,
          attributes: ["userId"],
        },
      },
    });

    res.json(DataResponse(order, product_order));
  } catch (err) {
    console.log(err);
    res.json(InternalErrorResponse());
  }
});

router.get("/petOrder/:id", requireRole("US"), async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const order = await Order.findOne({
      where: {
        id: id,
      },
      // include: {
      //   model: Delivery,
      //   attributes: ["receiverName", "receiverAddress", "receiverPhone"],
      // },
      include: {
        model: Pet,
        attributes: ["petName", "petPrice", "breed"],
        include: {
          model: Post,
        },
      },
    });
    const delivery = await Delivery.findOne({
      where: {
        id: order.dataValues.deliveryId,
      },
    });

    res.json(DataResponse(order, delivery));
  } catch (err) {
    console.log(err);
    res.json(InternalErrorResponse());
  }
});

router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const orderData = req.body;

  const result = await Product.update(orderData, {
    where: {
      id: id,
    },
  });

  if (result[0] === 0) {
    res.json(NotFoundResponse());
  } else {
    res.json(MessageResponse("Order updated successfully"));
  }
});

router.delete("/:id", requireRole("AD"), async (req, res, next) => {
  const id = parseInt(req.params.id);

  try {
    const result = await Product.destroy({
      where: {
        id: id,
      },
    });

    if (result === 0) {
      res.json(NotFoundResponse());
    } else {
      res.json(MessageResponse("Order deleted successfully!"));
    }
  } catch (err) {
    console.log(err);
    res.json(InternalErrorResponse());
  }
});

export default router;
