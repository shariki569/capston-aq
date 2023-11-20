import db from "../../db.js";

export const getRatings = async () => {
  try {
    const [rows] = await db.query(`SELECT 
      AVG(FeedBack_Rating) as TotalRating, COUNT(FeedBack_ID) as TotalFeedBack
      FROM feedback`);
    // const connection = await db.getConnection();

    return rows[0];
   
  } catch (err) {
    throw err;
  }
};
