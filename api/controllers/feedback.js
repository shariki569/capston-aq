import db from "../db.js";

export const addFeedback = async (req, res) => {
  try {
    const q =
      "INSERT INTO feedback (`FeedBack_Name`, `FeedBack_Email`, `FeedBack_Rating`, `FeedBack_Description`) VALUES (?, ?, ?, ,?)";

    const values = [
      req.body.Name,
      req.body.Email,
      req.body.Rating,
      req.body.Description,
    ];

    await db.query(q, values);
    return res.json("Feedback has been added");
  } catch (err) {
    console.log(err);
    return res.status(500).json("Internal server error");
  }
};

export const getFeedback = async (req, res) => {
  try {
    const q = `SELECT 
    FeedBack_Name, 
    FeedBack_Email, 
    AVG(FeedBack_Rating) as AverageRating,
    GROUP_CONCAT(FeedBack_Description) as Descriptions
FROM feedback 
GROUP BY FeedBack_Name, FeedBack_Email; `;

    const connection = await db.getConnection();
    const [rows] = await connection.query(q);

    return res.status(200).json(rows);
  } catch (err) {
    console.log(err);
    return res.status(500).json("Internal server error");
  }
};

export const getRatings = async (req, res) => {
  try {
    const q = `SELECT 
    FeedBack_Name, 
    FeedBack_Email, 
    SUM(FeedBack_Rating) as TotalRating
FROM feedback 
GROUP BY FeedBack_Name, FeedBack_Email;`;

    const connection = await db.getConnection();
    const [rows] = await connection.query(q);
    return res.status(200).json(rows);
  } catch {
    console.log(err);
    return res.status(500).json("Internal server error");
  }
};
