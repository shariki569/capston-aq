
// import { envConfig } from "./envConfig.js";
import jwt from "jsonwebtoken";
// envConfig();


export const restrictTo = (...role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.Role_Name)) {
      return res
        .status(403)
        .json({ message: "You do not have permission to perform this action" });
    }
    next();
  };
};


export const authenticateToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.sendStatus(401);
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403).json('You are not authenticated!');
    }
    req.user = user.Role_Name;
    next();
  })
}

// export const authenticateToken = (req, res, next) => {
//     const authHeader = req.headers["authorization"];
//     const token = authHeader && authHeader.split(" ")[1];
//     if (token == null) {
//       return res.sendStatus(401);
//     }
//     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//       if (err) {
//         return res.sendStatus(401);
//       }
//       req.user = user;
//       next();
//     });
//   };
