import { NlpManager, ConversationContext } from "node-nlp";
import { generateCorpusEntries } from "../chatbot/corpus-generator/corpusGenerator.js";
import db from "../db.js";

const nlp = new NlpManager({
  languages: ["en", "tl"],
  forceNER: true,
  autoSave: false,
  nlu: { useNoneFeature: true, log: true },
  ner: { threshold: 1 },
  
});
const context = new ConversationContext();
nlp.addLanguage("en");
// nlp.addLanguage("tl");
nlp.addCorpus("./chatbot/corpus-entities.json")
nlp.addCorpus("./chatbot/corpus-en.json");
nlp.addCorpus("./chatbot/corpus-tl.json");

const corpusEntries = await generateCorpusEntries();

// const [intents, fields] = await db.execute('SELECT * FROM intents');
// for (let intent of intents) {
//   const [utterances, fields] = await db.execute('SELECT * FROM utterances WHERE intentID = ?', [intent.IntentID]);
//   for (let utterance of utterances) {
//     nlp.addDocument('en', utterance.UtteranceText, intent.IntentName);
//   }
// }
 
// const [answes, fields] = await db.execute('SELECT * FROM answers');
const [intents, fields] = await db.execute('SELECT * FROM intents');
for (let intent of intents) {
  const [utterances, utteranceFields] = await db.execute('SELECT * FROM utterances WHERE intentID = ?', [intent.IntentID]);
  for (let utterance of utterances) {
    nlp.addDocument('en', utterance.UtteranceText, intent.IntentName);
  }

  const [answers, answerFields] = await db.execute('SELECT * FROM answers WHERE ans_intentID = ?', [intent.IntentID]);
  for (let answer of answers) {
    nlp.addAnswer('en', intent.IntentName, answer.AnswerTxt);
  }
}
// Add each entry to the NLP manager
corpusEntries.forEach((entry) => {
  entry.utterances.forEach((utterance) => {
    nlp.addDocument("en", utterance, entry.intent);
  });
  entry.answers.forEach((answer) => {
    nlp.addAnswer("en", entry.intent, answer);
  });
});

await nlp.train();

const processInput = async (input, context) => {
  try {
    const result = await nlp.process("en", input, context);

    if (result.answer) {
      context.previousIntent = result.intent;
      context.previousInput = input;
      context.previousAnswer = result.answer;

      return result.answer;
    } else {
      return "I'm sorry, I didn't understand that.";
    }
  } catch (error) {
    console.error("Error processing input:", error);
    throw new Error("Internal server error");
  }
};

export const chatbotRes = async (req, res) => {
  const { input } = req.body;

  if (!input) {
    return res.status(400).json({ error: "No input provided" });
  }

  try {
    if (!input) {
      return res.json({ answer: "Hi, I'm a chatbot. How can I help you?" });
    }
    const answer = await processInput(input, context);
    res.json({ answer });
  } catch (error) {
    console.error("Error processing input:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
