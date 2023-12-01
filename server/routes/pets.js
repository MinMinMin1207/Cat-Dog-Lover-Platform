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

import Pet from "../models/Pet.js";
import Post from "../models/Post.js";

import { requireRole } from "../middlewares/auth.js";
import fileUpload from "express-fileupload";
import User from "../models/User.js";
import { Op, where } from "sequelize";
import sequelize from "../database/database.js";

const router = express.Router();

const accept = "accepted";
const reject = "rejected";
const pending = "pending";

//=============================Pets===============================================

router.put("/updateinfo", requireRole("US"), async (req, res) => {
  const data = req.body;
  console.log(
    data.petId,
    data.petName,
    data.price,
    data.breed,
    data.age,
    data.desc
  );

  const pet = await Pet.findOne({
    where: {
      id: data.petId,
    },
    include: {
      model: Post,
      attributes: ["id"],
    },
  });

  const number = pet.post.dataValues.id;

  const result = await Pet.update(
    {
      petName: data.petName,
      breed: data.breed,
      age: data.age,
      petPrice: data.price,
    },
    {
      where: {
        id: data.petId,
      },
    }
  );

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

  if (result === 0) {
    res.json(NotFoundResponse());
  } else {
    res.json(MessageResponse("Pet updated successfully!"));
  }
});

//=============================Shopping===============================================

router.get("/list_cat", requireRole("US"), async (req, res) => {
  const pageNo = parseInt(req.query.page_no) || 1;
  const limit = parseInt(req.query.limit) || 12;

  const count = await Pet.count({
    where: {
      species: "Cat",
      petPrice: {
        [Op.gt]: 0,
      },
      status: accept,
    },
  });

  const number = Math.ceil(count / limit);

  const pet = await Pet.findAll({
    limit: limit,
    offset: (pageNo - 1) * limit,
    where: {
      species: "Cat",
      petPrice: {
        [Op.gt]: 0,
      },
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
  if (pet == null) {
    res.json(NotFoundResponse());
  } else {
    res.json(DataResponse(pet, number));
  }
});

router.get("/list_dog", requireRole("US"), async (req, res) => {
  const pageNo = parseInt(req.query.page_no) || 1;
  const limit = parseInt(req.query.limit) || 12;

  const count = await Pet.count({
    where: {
      species: "Dog",
      petPrice: {
        [Op.gt]: 0,
      },
      status: accept,
    },
  });
  console.log(limit);

  const number = Math.ceil(count / limit);

  const pet = await Pet.findAll({
    limit: limit,
    offset: (pageNo - 1) * limit,
    where: {
      species: "Dog",
      petPrice: {
        [Op.gt]: 0,
      },
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

  if (pet == null) {
    res.json(NotFoundResponse());
  } else {
    res.json(DataResponse(pet, number));
  }
});

router.put("/invalid_pet", async (req, res) => {
  const data = req.body;
  const result = Pet.update(
    {
      status: reject,
    },
    {
      where: {
        id: data.products.id,
      },
    }
  );
  if (result == null) {
    res.json(NotFoundResponse());
  } else {
    res.json(DataResponse(result));
  }
});

//=============================Profile===============================================

router.post("/userPet", requireRole("US"), async (req, res) => {
  const id = req.body.id;

  const posts = await Post.findAll({
    where: {
      userId: id,
    },
    order: [["createdAt", "DESC"]],
    include: {
      model: Pet,
      where: {
        id: sequelize.col("pet.id"),
        petPrice: {
          [Op.gt]: 0,
        },
      },
    },
  });

  console.log(posts);
  if (posts == null) {
    res.json(NotFoundResponse());
  } else {
    res.json(DataResponse(posts.reverse()));
  }
});

router.post("/", requireRole("US"), fileUpload(), async (req, res) => {
  const { petName, species, breed, age, petPrice, content } = req.body;
  console.log(petName, species, breed, age, petPrice, content);

  const image = req.files.image;
  console.log(image);

  const userId = res.locals.userData.id;

  const [fileType, fileExt] = image.mimetype.split("/");
  const savePath = `./public/petImages/${Date.now()}_${petName.replace(
    " ",
    "-"
  )}.${fileExt}`;
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
    let pet = await Pet.create({
      petName,
      species,
      breed,
      age,
      petPrice,
      postId: post.id,
      image: savePath,
      creatorId: userId,
      status: pending,
    });
    res.json(
      DataResponse({
        id: pet.id,
        image: savePath,
        content: post.content,
      })
    );
  } catch (err) {
    console.log(err);
    res.json(InternalErrorResponse());
  }
});

//=============================Order==============================================

router.put("/sold_pet", requireRole("US"), async (req, res) => {
  const data = req.body;
  const result = Pet.update(
    {
      status: "sold",
    },
    {
      where: {
        id: data.products.id,
      },
    }
  );
  if (result == null) {
    res.json(NotFoundResponse());
  } else {
    res.json(DataResponse(result));
  }
});

//=============================Home===============================================

router.post("/search_cat_paging", requireRole("US"), async (req, res) => {
  const { keyword } = req.body;
  console.log(keyword);

  const pageNo = parseInt(req.query.page_no) || 1;
  const limit = parseInt(req.query.limit) || 5;

  const pet = await Pet.findAll({
    limit: limit,
    offset: (pageNo - 1) * limit,
    where: {
      species: "Cat",
      breed: { [Op.substring]: keyword },
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
  if (pet == null) {
    res.json(DataResponse(""));
  } else {
    res.json(DataResponse(pet));
  }
});

router.post("/search_dog_paging", requireRole("US"), async (req, res) => {
  const { keyword } = req.body;

  const pageNo = parseInt(req.query.page_no) || 1;
  const limit = parseInt(req.query.limit) || 5;

  const pet = await Pet.findAll({
    limit: limit,
    offset: (pageNo - 1) * limit,
    where: {
      species: "Dog",
      breed: { [Op.substring]: keyword },
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
  if (pet == null) {
    res.json(DataResponse(""));
  } else {
    res.json(DataResponse(pet));
  }
});

router.post("/search_cat", requireRole("US"), async (req, res) => {
  const { keyword } = req.body;

  const pet = await Pet.findAll({
    where: {
      species: "Cat",
      breed: { [Op.substring]: keyword },
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
  if (pet == null) {
    res.json(DataResponse(""));
  } else {
    res.json(DataResponse(pet));
  }
});

router.post("/search_dog", requireRole("US"), async (req, res) => {
  const { keyword } = req.body;

  const pet = await Pet.findAll({
    where: {
      species: "Dog",
      breed: { [Op.substring]: keyword },
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
  if (pet == null) {
    res.json(DataResponse(""));
  } else {
    res.json(DataResponse(pet));
  }
});

router.get("/", requireRole("US"), async (req, res) => {
  const userId = res.locals.userData.id;

  const pets = await Pet.findAll({
    where: {
      petPrice: {
        [Op.gt]: 0,
      },
      status: accept,
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

//=============================Admin===============================================

router.get("/pending_cat", async (req, res) => {
  const pageNo = parseInt(req.query.page_no) || 1;
  const limit = parseInt(req.query.limit) || 6;

  const pets = await Pet.findAll({
    where: {
      species: "Cat",
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
  if (pets == null) {
    res.json(NotFoundResponse());
  } else {
    res.json(DataResponse(pets));
  }
});

router.get("/pending_dog", async (req, res) => {
  const pageNo = parseInt(req.query.page_no) || 1;
  const limit = parseInt(req.query.limit) || 6;

  const pets = await Pet.findAll({
    where: {
      species: "Dog",
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
  if (pets == null) {
    res.json(NotFoundResponse());
  } else {
    res.json(DataResponse(pets));
  }
});

router.get("/acception_cat", async (req, res) => {
  const pageNo = parseInt(req.query.page_no) || 1;
  const limit = parseInt(req.query.limit) || 6;

  const pets = await Pet.findAll({
    where: {
      species: "Cat",
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
  if (pets == null) {
    res.json(NotFoundResponse());
  } else {
    res.json(DataResponse(pets));
  }
});

router.get("/acception_dog", async (req, res) => {
  const pageNo = parseInt(req.query.page_no) || 1;
  const limit = parseInt(req.query.limit) || 6;

  const pets = await Pet.findAll({
    where: {
      species: "Dog",
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
  if (pets == null) {
    res.json(NotFoundResponse());
  } else {
    res.json(DataResponse(pets));
  }
});

router.get("/rejection_cat", async (req, res) => {
  const pageNo = parseInt(req.query.page_no) || 1;
  const limit = parseInt(req.query.limit) || 6;

  const pets = await Pet.findAll({
    where: {
      species: "Cat",
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
  if (pets == null) {
    res.json(NotFoundResponse());
  } else {
    res.json(DataResponse(pets));
  }
});

router.get("/rejection_dog", async (req, res) => {
  const pageNo = parseInt(req.query.page_no) || 1;
  const limit = parseInt(req.query.limit) || 6;

  const pets = await Pet.findAll({
    where: {
      species: "Dog",
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
  if (pets == null) {
    res.json(NotFoundResponse());
  } else {
    res.json(DataResponse(pets));
  }
});

router.put("/accept_pet", async (req, res) => {
  const data = req.body;
  console.log(data.id);
  const result = Pet.update(
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

router.put("/reject_pet", async (req, res) => {
  const data = req.body;
  const result = Pet.update(
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

router.get("/all_dog", async (req, res) => {
  const pageNo = parseInt(req.query.page_no) || 1;
  const limit = parseInt(req.query.limit) || 6;

  const pets = await Pet.findAll({
    where: {
      species: "Dog",
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
  if (pets == null) {
    res.json(NotFoundResponse());
  } else {
    res.json(DataResponse(pets));
  }
});

router.get("/all_cat", async (req, res) => {
  const pageNo = parseInt(req.query.page_no) || 1;
  const limit = parseInt(req.query.limit) || 6;

  const pets = await Pet.findAll({
    where: {
      species: "Cat",
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
  if (pets == null) {
    res.json(NotFoundResponse());
  } else {
    res.json(DataResponse(pets));
  }
});

//====================================ManagePost===================================

router.post("/pending/manage_cat", requireRole("US"), async (req, res) => {
  const id = req.body.id;

  const posts = await Post.findAll({
    where: {
      userId: id,
    },
    order: [["createdAt", "DESC"]],
    include: {
      model: Pet,
      where: {
        id: sequelize.col("pet.id"),
        status: "pending",
        species: "Cat",
      },
    },
  });

  console.log(posts);
  if (posts == null) {
    res.json(NotFoundResponse());
  } else {
    res.json(DataResponse(posts.reverse()));
  }
});

router.post("/pending/manage_Dog", requireRole("US"), async (req, res) => {
  const id = req.body.id;

  const posts = await Post.findAll({
    where: {
      userId: id,
    },
    order: [["createdAt", "DESC"]],
    include: {
      model: Pet,
      where: {
        id: sequelize.col("pet.id"),
        status: "pending",
        species: "Dog",
      },
    },
  });

  console.log(posts);
  if (posts == null) {
    res.json(NotFoundResponse());
  } else {
    res.json(DataResponse(posts.reverse()));
  }
});

router.post("/accepted/manage_cat", requireRole("US"), async (req, res) => {
  const id = req.body.id;

  const posts = await Post.findAll({
    where: {
      userId: id,
    },
    order: [["createdAt", "DESC"]],
    include: {
      model: Pet,
      where: {
        id: sequelize.col("pet.id"),
        status: "accepted",
        species: "Cat",
      },
    },
  });

  console.log(posts);
  if (posts == null) {
    res.json(NotFoundResponse());
  } else {
    res.json(DataResponse(posts.reverse()));
  }
});

router.post("/accepted/manage_Dog", requireRole("US"), async (req, res) => {
  const id = req.body.id;

  const posts = await Post.findAll({
    where: {
      userId: id,
    },
    order: [["createdAt", "DESC"]],
    include: {
      model: Pet,
      where: {
        id: sequelize.col("pet.id"),
        status: "accepted",
        species: "Dog",
      },
    },
  });

  console.log(posts);
  if (posts == null) {
    res.json(NotFoundResponse());
  } else {
    res.json(DataResponse(posts.reverse()));
  }
});

router.post("/rejected/manage_cat", requireRole("US"), async (req, res) => {
  const id = req.body.id;

  const posts = await Post.findAll({
    where: {
      userId: id,
    },
    order: [["createdAt", "DESC"]],
    include: {
      model: Pet,
      where: {
        id: sequelize.col("pet.id"),
        status: "rejected",
        species: "Cat",
      },
    },
  });

  console.log(posts);
  if (posts == null) {
    res.json(NotFoundResponse());
  } else {
    res.json(DataResponse(posts.reverse()));
  }
});

router.post("/rejected/manage_Dog", requireRole("US"), async (req, res) => {
  const id = req.body.id;

  const posts = await Post.findAll({
    where: {
      userId: id,
    },
    order: [["createdAt", "DESC"]],
    include: {
      model: Pet,
      where: {
        id: sequelize.col("pet.id"),
        status: "rejected",
        species: "Dog",
      },
    },
  });

  console.log(posts);
  if (posts == null) {
    res.json(NotFoundResponse());
  } else {
    res.json(DataResponse(posts.reverse()));
  }
});

//=================================================================================

router.get("/:id", requireRole("US"), async (req, res) => {
  const id = parseInt(req.params.id);
  const pet = await Pet.findOne({
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
  if (pet == null) {
    res.json(NotFoundResponse());
  } else {
    res.json(DataResponse(pet));
  }
});

router.get("/admin/:id", requireRole("US"), async (req, res) => {
  const id = parseInt(req.params.id);
  const pet = await Pet.findOne({
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
  if (pet == null) {
    res.json(NotFoundResponse());
  } else {
    res.json(DataResponse(pet));
  }
});

export default router;
