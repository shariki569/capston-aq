import db from "../db.js";

// export const getIntents = async (req, res) => {
//   try {
//     const connection = await db.getConnection();
//     const [rows] = await connection.query(`
//     SELECT 
//     intents.IntentID,
//     intents.IntentName, 
//     GROUP_CONCAT(DISTINCT utterances.UtteranceText SEPARATOR '|') AS utterances,
//     GROUP_CONCAT(DISTINCT answers.AnswerTxt SEPARATOR '|') AS answers,
//     COUNT(DISTINCT answers.AnswerID) AS total_answers,
//     COUNT(DISTINCT utterances.UtteranceID) AS total_utterances
//     FROM intents
//     LEFT JOIN answers ON intents.IntentID = answers.ans_intentID
//     LEFT JOIN utterances ON intents.IntentID = utterances.intentID
//     WHERE intents.Is_Deleted = 0
//     GROUP BY intents.IntentID
//     ORDER BY intents.IntentName
//     `);


//     const result = rows.map((row) => ({
//       ...row,
//       utterances: row.utterances.split("|"),
//       answers: row.answers.split("|"),
//     }))

//     connection.release();
//     return res.status(200).json(result);
//   } catch (err) {
//     console.error("Database error:", err);
//     res.status(500).json("Internal server error");
//   }
// };

export const getIntents = async (req, res) => {
  try {
    const connection = await db.getConnection();
    const [rows] = await connection.query(`
    SELECT 
    intents.IntentID,
    intents.IntentName, 
    GROUP_CONCAT(DISTINCT utterances.UtteranceText SEPARATOR '\n') AS utterances,
    GROUP_CONCAT(DISTINCT answers.AnswerTxt SEPARATOR '\n') AS answers,
    COUNT(DISTINCT answers.AnswerID) AS total_answers,
    COUNT(DISTINCT utterances.UtteranceID) AS total_utterances
    FROM intents
    LEFT JOIN answers ON intents.IntentID = answers.ans_intentID
    LEFT JOIN utterances ON intents.IntentID = utterances.intentID
    WHERE intents.Is_Deleted = 0
    GROUP BY intents.IntentID
    ORDER BY intents.IntentName
    `);

    const result = rows.map((row) => ({
      ...row,
      utterances: row.utterances ? row.utterances.split("\n") : [],
      answers: row.answers ? row.answers.split("\n") : [],
    }));

    connection.release();
    return res.status(200).json(result);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json("Internal server error");
  }
};


export const addIntent = async (req, res) => {
  try {
    const { Intent, Utterances, Answers } = req.body;
    // Check if the intent already exists
    const [existingIntent] = await db.query(
      `SELECT * FROM intents WHERE IntentName = ?`,
      [Intent]
    );
    if (existingIntent.length > 0) {
      return res.status(409).json({ message: "Intent already exists" });
    }

    // Add the intent to the intents table
    const [intentResult] = await db.query(
      `INSERT INTO intents (IntentName) VALUES (?)`,
      [Intent]
    );
    const IntentID = intentResult.insertId;

    // Add utterances to the utterances table
    for (const utterance of Utterances) {
      await db.query(
        `INSERT INTO utterances (UtteranceText, intentID) VALUES (?, ?)`,
        [utterance, IntentID]
      );
    }

    // Add answers to the answers table
    for (const answer of Answers) {
      await db.query(
        `INSERT INTO answers (AnswerTxt, ans_intentID) VALUES (?, ?)`,
        [answer, IntentID]
      );
    }

    return res.status(201).json({ message: "Intent created successfully" });
  } catch (err) {
    console.error("Error adding intent:", err);
    return res.status(500).json({ message: "Cannot add intent" });
  }
};

// Update an existing intent and its utterances and answers
export const updateIntent = async (req, res) => {
  try {
    const intentID = req.params.id;
    const { Intent, Utterances, Answers } = req.body;

    // Check if the intent exists
    const [existingIntent] = await db.query(
      `SELECT * FROM intents WHERE IntentID = ?`,
      [intentID]
    );
    if (existingIntent.length === 0) {
      return res.status(404).json({ message: "Intent not found" });
    }

    // Update the intent name in the intents table
    await db.query(`UPDATE intents SET IntentName = ? WHERE IntentID = ?`, [
      Intent,
      intentID,
    ]);

    // Delete the old utterances and answers for the intent
    await db.query(`DELETE FROM utterances WHERE intentID = ?`, [intentID]);
    await db.query(`DELETE FROM answers WHERE ans_intentID = ?`, [intentID]);

    // Add the new utterances and answers for the intent
    for (const utterance of Utterances) {
      await db.query(
        `INSERT INTO utterances (UtteranceText, intentID) VALUES (?, ?)`,
        [utterance, intentID]
      );
    }

    for (const answer of Answers) {
      await db.query(
        `INSERT INTO answers (AnswerTxt, ans_intentID) VALUES (?, ?)`,
        [answer, intentID]
      );
    }

    return res.status(200).json({ message: "Intent updated successfully" });
  } catch (err) {
    console.error("Error updating intent:", err);
    return res.status(500).json({ message: "Cannot update intent" });
  }
};

export const deleteIntent = async (req, res) => {
  try {
    const intentID = req.params.id;

    await db.query(`UPDATE intents SET Is_Deleted = 1 WHERE IntentID = ?`, [
      intentID,
    ]);
    res.status(200).json({ message: "Intent deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Intent Delete Error" });
  }
};


