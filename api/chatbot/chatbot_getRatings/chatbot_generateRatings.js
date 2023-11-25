


// export const getRatings = async (req, res) => {
//     try {
//       const q = `SELECT 
//       AVG(FeedBack_Rating) as TotalRating, COUNT(FeedBack_ID) as TotalFeedBack
//       FROM feedback`;
  
//       const connection = await db.getConnection();
//       const [rows] = await connection.query(q);
//       return res.status(200).json(rows);
//     } catch (err) {
//       console.log(err);
//       return res.status(500).json("Internal server error");
//     }
//   };
  
export const generateRatingEntry = async (ratingDetails) => {
    return [
        {
            intent: "agent.rating",
            utterances: [
                "how was your experience?",
                "what is your rating?"
            ],
            answers: [
                
                `The average rating of our service is ${Number(ratingDetails.TotalRating).toFixed(1)} out of 5`,
                `We have an average rating of ${ratingDetails.TotalRating} out of 5`
            ]

        },
        {
            
            intent: "agent.feedback",
            utterances: [
                "hows the feedback",
                "whats the feedback of your customer",
            ],
            answers: [
                
                `We have a total of ${ratingDetails.TotalFeedBack} feedback`,
                `We have ${ratingDetails.TotalFeedBack} feedback`
            ]
        }
    ]
}