import jwt from "jsonwebtoken";
import { UnAuthorizedResponse } from "../common/reponses.js";

const roles = {
  GU: 0,
  US: 1,
  AD: 2,
  SF: 3,
};

function roleLevel(role) {
  return roles[role];
}

export function requireRole(role) {
  const middleware = (req, res, next) => {
    const token = req.headers["authorization"] || req.cookies.token;
    try {
      const data = jwt.verify(token, process.env.SECRET);
      res.locals.userData = data;

      console.log(data);
      if (roleLevel(data.role) >= roleLevel(role)) {
        next();
      } else {
        throw Error("Unauthorized");
      }
    } catch (err) {
      res.json(UnAuthorizedResponse());
    }
  };
  return middleware;
}
