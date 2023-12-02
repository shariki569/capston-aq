
// import { envConfig } from "./envConfig.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// export const restrictTo = (...role) => {
//   return (req, res, next) => {
//     if (!role.includes(req.user.Role_Name)) {
//       return res
//         .status(403)
//         .json({ message: "You do not have permission to perform this action" });
//     }
//     next();
//   };
// };


export const isAdmin = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const userRole = decoded.Role;


    if (userRole !== "Admin") {
      return res.status(403).json({ message: "You do not have permission to perform this action" });
      // user is not an admin
    }

    // user is an admin, pass the user id and role to the next middleware
    req.userId = userId;
    req.userRole = userRole;
    next()

  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }

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
