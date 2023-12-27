


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
                'feedback of the resort',
                "hows the feedback",
                "whats the feedback of your customer",
                'feedback on your service'
            ],
            answers: [

                `We have a total of ${ratingDetails.TotalFeedBack} feedback`,
                `We have ${ratingDetails.TotalFeedBack} feedback`,
                
            ]
        },
        {
            intent: "agent.posts",
            utterances: [
                'What is the recent blog post',
                'Where is the blog posts?',
                'Provide me some of the blog posts',
                'blog posts?',
                'Where can I find the latest blog posts',
                'where can i find your posts',
                'Locate me to your blog',
                'Locate me to your blog page',
                'Locate me to your blog post page',
                'blog'
            ],
            answers: [

                `You can find our blog posts by clicking the link 
                <a href="${process.env.WEBSITE_URL}/posts" target="_blank" style="color:blue; text-decoration:underline">Blog Posts page</a> `,
                `You will find our blog posts here 
                <a href="${process.env.WEBSITE_URL}/posts" target="_blank" style="color:blue; text-decoration:underline">Blog Posts page</a> `
                
            ]
        }
    ]
}