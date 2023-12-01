import express from "express";
import User from "../models/User.js";

import {
  MessageResponse,
  DataResponse,
  Response,
  InternalErrorResponse,
  NotFoundResponse,
  ErrorResponse,
  UnAuthorizedResponse,
} from "../common/reponses.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { decrypt, encrypt } from "../common/crypto.js";
import sendEmail from "../common/sendEmail.js";

import fileUpload from "express-fileupload";
import { requireRole } from "../middlewares/auth.js";

import { Op } from "sequelize";

const router = express.Router();

//================================Admin============================================

router.get("/", async (req, res) => {
  const users = await User.findAll();
  res.json(DataResponse(users));
});

router.get("/available_user", async (req, res) => {
  const users = await User.findAll({
    where: {
      role: "US",
      ban: null,
    },
  });
  res.json(DataResponse(users));
});

router.get("/ban_user", async (req, res) => {
  const users = await User.findAll({
    where: {
      role: "US",
      ban: { [Op.ne]: null },
    },
  });
  res.json(DataResponse(users));
});

router.get("/staff", requireRole("AD"), async (req, res) => {
  const users = await User.findAll({
    where: {
      role: "SF",
    },
  });
  res.json(DataResponse(users));
});

router.delete("/remove_staff/:id", requireRole("AD"), async(req,res)=>{
  const id = req.params.id

  const user = await User.destroy({
    where:{
      id: id
    }
  })
  if(user){
    res.json(DataResponse("done"))
  }
})

router.get("/chart_user", async (req, res) => {
  const user = await User.findAll({});

  let list = user.map((item) => item.dataValues.createdAt.toJSON().slice(0, 7));
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

router.put("/ban_User", async (req, res) => {
  const data = req.body;

  const user = await User.update(
    {
      ban: data.ban,
    },
    {
      where: {
        id: data.id,
      },
    }
  );
  res.json(DataResponse(user));
});

router.post("/register", async (req, res) => {
  const userData = req.body;
  try {
    const hashPassword = await bcrypt.hash(userData.password, 10);

    const data = {
      email: userData.email,
      password: hashPassword,
      // userName: userData.username,
      // iat: Date.now(),
      // gender: userData.gender,
      // fullName: userData.fullName,
      // phoneNumber: userData.phoneNumber,
    };

    const user = await User.findOne({
      where: {
        email: userData.email,
      },
    });
    if (user) {
      res.json(ErrorResponse(400, "Username or email already exist"));
      return;
    }

    const encrypted = encrypt(data);

    const confirmLink = `${process.env.SERVER_URL}/users/confirm_register?code=${encrypted}`;

    sendEmail(
      data.email,
      "Confirm register account at Paws and Whiskers",
      `
      <p>Dear User,</p>

    <p>Thank you for registering on our website! To fully unlock all the features and join our community, please complete your registration by following this link:</p>
    
    <a href="${confirmLink}" target="_blank">Complete Registration</a>

    <p>We look forward to your active participation.</p>

    <p>Best regards,<br>Paws And Whisker</p>`,
      () => {
        res.json(
          DataResponse("Please check your mail to register your account")
        );
      }
    );

    // User.create(data);
  } catch (err) {
    console.log(err);
    res.json(InternalErrorResponse());
  }
});

router.get("/confirm_register", async (req, res) => {
  const code = req.query.code;

  try {
    const data = decrypt(code);
    if (Date.now() - data.iat > 5 * 60 * 1000) {
      res.json(UnAuthorizedResponse());
      return;
    }

    const user = await User.create({
      email: data.email,
      // username: data.username,
      password: data.password,
    });

    const payload = {
      email: user.email,
      id: user.id,
      // username: user.username,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.SECRET, {
      expiresIn: "3h",
    });

    res.cookie("token", token);
    res.redirect(`${process.env.CLIENT_URL}/register`);
  } catch (err) {
    console.log(err);
    res.json(InternalErrorResponse());
  }
});

router.post("/forgot_password", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      res.json(DataResponse("Not Found"));
    } else {
      const data = {
        email: user.email,
      };
      const encrypted = encrypt(data);
      console.log(encrypted);
      const confirmLink = `${process.env.SERVER_URL}/users/confirm_forgot_password?code=${encrypted}`;

      sendEmail(
        data.email,
        "You will abled to change your password ",
        `
      <p>click this link to change your password</p><br>
        <a href= "${confirmLink}">${confirmLink}</a>`,
        () => {
          res.json(DataResponse("Please check your mail to reset password"));
        }
      );
    }
  } catch (err) {
    console.log(err);
    res.json(InternalErrorResponse());
  }
});

router.get("/confirm_forgot_password", async (req, res) => {
  const code = req.query.code;
  console.log(code);
  try {
    console.log(1);
    const data = decrypt(code);
    if (Date.now() - data.iat > 5 * 60 * 1000) {
      res.json(UnAuthorizedResponse());
      return;
    }

    const user = await User.findOne({
      where: {
        email: data.email,
      },
    });
    const payload = {
      email: user.email,
      id: user.id,
      // username: user.username,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.SECRET, {
      expiresIn: "3h",
    });

    res.cookie("token", token);
    res.redirect(`${process.env.CLIENT_URL}/forgotpass`);
  } catch (err) {
    console.log(err);
    res.json(InternalErrorResponse());
  }
});

router.put("/change_password", async (req, res) => {
  const userData = req.body;
  console.log(userData.password);
  console.log(userData.email);
  const hashPassword = await bcrypt.hash(userData.password, 10);
  console.log(2);
  const user = User.update(
    {
      password: hashPassword,
    },
    {
      where: {
        email: userData.email,
      },
    }
  );

  if (user === 0) {
    res.json(NotFoundResponse());
  } else {
    res.json(MessageResponse("Password change successfully!"));
  }
});

router.post("/login", async (req, res) => {
  const userData = req.body;

  const user = await User.findOne({
    where: {
      email: userData.email,
      // userName: userData.userName,
    },
  });

  console.log(userData.ban);

  if (user == null) {
    res.json(NotFoundResponse());
    return;
  }

  const isMatchPassword = await bcrypt.compare(
    userData.password,
    user.password
  );
  if (isMatchPassword && userData.ban === undefined) {
    // res.send(MessageResponse('Login successfully!'))
    const payload = {
      email: user.email,
      id: user.id,
      username: user.username,
      role: user.role,
    };
    console.log(payload);
    const token = jwt.sign(payload, process.env.SECRET, {
      expiresIn: "3h",
    });
    res.cookie("token", token);
    res.json(
      DataResponse(
        {
          token: token,
        },
        user.role
      )
    );
    // console.log(user.role);
    // if (user.role === "US") {
    //   console.log("1");
    //   res.redirect(`${process.env.CLIENT_URL}/home`);
    // } else if (user.role === "ST") {
    //   res.redirect(`${process.env.CLIENT_URL}/staff`);
    // } else if (user.role === "AD") {
    //   res.redirect(`${process.env.CLIENT_URL}/admin`);
    // } else {
    //   res.json(ErrorResponse(401, "undefine role"));
    // }
  } else {
    res.json(ErrorResponse(401, "Invalid your email or password!"));
  }
});

router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  const user = await User.findOne({
    where: {
      id: id,
    },
  });
  res.json(DataResponse(user));
});

router.get("/:username", async (req, res) => {
  const username = req.params.username;

  const user = await User.findOne({
    where: {
      username: username,
    },
  });
  res.json(DataResponse(user));
});

router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  const result = await User.destroy({
    where: {
      id: id,
    },
  });
  if (result === 0) {
    res.json(NotFoundResponse());
  } else {
    res.json(MessageResponse("User deleted successfully!"));
  }
});

router.delete("/:username", async (req, res) => {
  const username = req.params.username;

  const result = await User.destroy({
    where: {
      username: username,
    },
  });
  if (result === 0) {
    res.json(NotFoundResponse());
  } else {
    res.json(MessageResponse("User deleted successfully!"));
  }
});

router.put("/updateUser", requireRole("US"), async (req, res) => {
  const { fullName, dateOfBirth, phoneNumber, userName, gender } = req.body;
  console.log(fullName, dateOfBirth, phoneNumber, userName, gender);
  const result = await User.update(
    {
      fullName: fullName,
      userName: userName,
      dob: dateOfBirth,
      // gender: gender,
      phoneNumber: phoneNumber,
      // avatar: savePath,
    },
    {
      where: { email: res.locals.userData.email },
    }
  );
  if (result === 0) {
    res.json(NotFoundResponse());
  } else {
    res.json(MessageResponse("User updated successfully!"));
  }
});

router.put(
  "/registerinfomation",
  requireRole("US"),
  fileUpload(),
  async function (req, res) {
    const { fullName, userName, dateOfBirth, gender, phoneNumber } = req.body;
    console.log(fullName, userName, dateOfBirth, gender, phoneNumber);

    // const image = req.files.avatar;
    // const [fileType, fileExt] = image.mimetype.split("/");

    // const savePath = `./public/userImages/${Date.now()}_${userName.replace(
    //   " ",
    //   "-"
    // )}.${fileExt}`;

    // const allowExtensions = ["png", "jpg", "jpeg"];
    // if (fileType !== "image" || !allowExtensions.includes(fileExt)) {
    //   res.json(InvalidTypeResponse());
    //   return;
    // }
    // console.log(savePath);
    // image.mv(savePath);

    const result = await User.update(
      {
        fullName: fullName,
        userName: userName,
        dob: dateOfBirth,
        gender: gender,
        phoneNumber: phoneNumber,
        // avatar: savePath,
      },
      {
        where: { email: res.locals.userData.email },
      }
    );

    if (result === 0) {
      res.json(NotFoundResponse());
    } else {
      res.json(MessageResponse("User updated successfully!"));
    }
  }
);

export default router;
