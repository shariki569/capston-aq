import db from "../../db.js";

export const getRatings = async () => {
  const connection = await db.getConnection();
  try {
    const [rows] = await connection.query(`SELECT 
      AVG(FeedBack_Rating) as TotalRating, COUNT(FeedBack_ID) as TotalFeedBack
      FROM feedback`);
    // const connection = await db.getConnection();
    connection.release();
    return rows[0];
   
  } catch (err) {
    throw err;
  }
};
