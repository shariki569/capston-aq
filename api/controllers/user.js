import db from "../db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


export const getUsers = async (req, res) => {
   const connection = await db.getConnection();
   try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;
      const [[{ count }]] = await connection.query(`SELECT COUNT(*) AS count FROM users WHERE isDeleted = 0`);
      const totalPages = Math.ceil(count / limit);

      const [rows] = await connection.query(`
         SELECT u.id, u.username, u.email, u.img, u.Date_Created, u.role, r.Role_Name 
         FROM users u 
         INNER JOIN role r 
         ON u.role = r.Role_Id
         WHERE isDeleted = 0
         LIMIT ? 
         OFFSET ?`,
         [limit, offset]
      );

      connection.release();

      if (!rows.length) {
         return res.status(404).json("No users found");
      }
      return res.status(200).json({ users: rows, totalPages });
   } catch (err) {
      console.error("Database error:", err);
      return res.status(500).json("Internal server error");
   }
}

export const deleteUsers = async (req, res) => {
   try {
      const connection = await db.getConnection();
      const userId = req.params.id;

      // check if the user to be deleted is an admin
      const [user] = await connection.query(
         "SELECT * FROM users WHERE id = ?",
         [userId]
      );

      if (user.length === 0) {
         return res.status(404).json("User not found");
      }

      if (user[0].role === 1) {
         return res.status(403).json("Cannot delete another admin");
      }

      // delete the user
      const [rows] = await connection.query(
         "UPDATE users SET isDeleted = 1 WHERE id = ?",
         [userId]
      );
      connection.release();

      return res.status(200).json("User deleted successfully");
   } catch (err) {
      console.error("Database error:", err);
      return res.status(500).json("Internal server error");
   }
};


export const updateRole = async (req, res) => {
   try {
      const connection = await db.getConnection();
      const userId = req.params.id;
      const [user] = await connection.query(
         "SELECT * FROM users WHERE id = ?", [userId]
      )

      if (user.length === 0) {
         return res.status(404).json("User not found");
      }

      if (user[0].role === 1) {
         return res.status(403).json("Cannot edit the role of another admin");
      }

      const [rows] = await connection.query(
         "UPDATE users SET role = ? WHERE id = ?",
         [req.body.role, userId]
      )
      connection.release();
      res.status(200).json("Role updated successfully");

   } catch (err) {
      console.error("Database error:", err);
      return res.status(500).json("Internal server error");
   }
}


