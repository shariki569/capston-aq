import { NlpManager, ConversationContext } from "node-nlp";
import { generateCorpusEntries } from "../chatbot/corpus-generator/corpusGenerator.js";

const nlp = new NlpManager({
  languages: ["en", "tl"],
  forceNER: true,
  autoSave: false,
  nlu: { useNoneFeature: true, log: true },
  ner: { threshold: 1 },
});
const context = new ConversationContext();

nlp.addCorpus("./chatbot/corpus-en.json");
nlp.addCorpus("./chatbot/corpus-tl.json");

const corpusEntries = await generateCorpusEntries();

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

      // if (result.intent === 'introduce.name') {
      //   context.name = result.parameters.name;
      // } else if (result.intent === 'introduce.age') {
      //   context.age = result.parameters.age;
      // }
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
    if (input === "start") {
      return res.json({ answer: "Hi, I'm a chatbot. How can I help you?" });
    }
    const answer = await processInput(input, context);
    res.json({ answer });
  } catch (error) {
    console.error("Error processing input:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
