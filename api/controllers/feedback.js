import db from "../db.js";
import jwt from "jsonwebtoken";
import { envConfig } from "../middleware/envConfig.js";
envConfig();

export const addFeedback = async (req, res) => {
  try {
    const connection = await db.getConnection();
    const q =
      "INSERT INTO feedback (`FeedBack_Name`, `FeedBack_Email`, `FeedBack_Rating`, `FeedBack_Description`, `FeedBack_Status`, `is_Deleted`) VALUES (?, ?, ?, ?, ?, ?)";

    const values = [
      req.body.Name,
      req.body.Email,
      req.body.Rating,
      req.body.Description,
      "Pending",
      0,
    ];

    await connection.query(q, values);
    connection.release();
    return res.json("Feedback has been added");
  } catch (err) {
    console.log(err);
    return res.status(500).json("Internal server error");
  }
};
export const getFeedback = async (req, res) => {
  try {
    const connection = await db.getConnection();
    const q = `SELECT 
    feedback.FeedBack_ID,
    feedback.FeedBack_Name, 
    feedback.FeedBack_Email, 
    feedback.FeedBack_Status,
    users.username as approved_By,
    AVG(FeedBack_Rating) as AverageRating,

    GROUP_CONCAT(FeedBack_Description) as Descriptions
    FROM feedback
    LEFT JOIN users ON feedback.approved_By = users.id

    GROUP BY FeedBack_ID, FeedBack_Name, FeedBack_Email
    ORDER BY MAX(FeedBack_Date) DESC `;


    const [rows] = await connection.query(q);
    connection.release();
    return res.status(200).json(rows);
  } catch (err) {
    console.log(err);
    return res.status(500).json("Internal server error");
  }
};

export const getRatings = async (req, res) => {
  try {
    const q = `SELECT 
    AVG(FeedBack_Rating) as TotalRating, COUNT(FeedBack_ID) as TotalFeedBack
    FROM feedback`;

    const connection = await db.getConnection();
    const [rows] = await connection.query(q);
    connection.release();
    return res.status(200).json(rows);
  } catch (err) {
    console.log(err);
    return res.status(500).json("Internal server error");
  }
};

export const updateFeedback = async (req, res) => {
  const token = req.cookies.access_token;
  if (!token)
    return res.status(401).json("Not Authenticated to Update this feedback");

  try {
    const connection = await db.getConnection();
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const feedbackId = req.params.id;

    const [users] = await connection.query(
      "SELECT users.id, users.username, users.email, role.Role_Name FROM users INNER JOIN role ON users.role = role.Role_ID WHERE users.id = ?",
      [userId]
    );

    if (users.length === 0 || users[0].Role_Name !== "Admin") {
      return res
        .status(401)
        .json("Only admins are allowed to update this feedback");
    }

    const q =
      "UPDATE feedback SET `FeedBack_Status` = ?, `approved_By` = ? WHERE `FeedBack_ID` = ?";

    const values = [req.body.Status, userId, feedbackId];

    const [result] = await connection.query(q, values);
    connection.release();
    return res.json("Feedback has been approved!");
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};

export const approvedFeedback = async (req, res) => {
  try {
    const q = `SELECT FeedBack_ID, FeedBack_Name, FeedBack_Email, FeedBack_Description, FeedBack_Rating FROM feedback WHERE FeedBack_Status = 'Approved'`;
    const connection = await db.getConnection();
    const [rows] = await connection.query(q);
    connection.release();
    if (rows.length === 0) {
      return res.status(404).json("No feedback found");
    }

    return res.status(200).json(rows);
  } catch (err) {
    console.log(err);
    return res.status(500).json("Internal server error");
  }
};
