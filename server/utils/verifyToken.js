import jwt from "jsonwebtoken";
import { createError } from "./error";

// Pengecekan Token
export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token || token === undefined) {
    return createError(401, "You are not authenthicated !");
  }
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) {
      return next(createError(403, "Token is not valid"));
    }
    req.user = user;
    console.info(req.user);
    next();
  });
};
export const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id == req.params.id || req.user.isadmin) {
      console.info("ok");
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};
export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isadmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};
