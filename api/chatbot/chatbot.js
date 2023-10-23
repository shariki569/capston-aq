import { NlpManager, ConversationContext } from "node-nlp";
import fs from "fs";
import path, { resolve } from "path";


const nlp = new NlpManager({
  languages: ["en"],
  forceNER: true,
  autoSave: false,
  nlu: { useNoneFeature: true, log: true },
});
const context = new ConversationContext();

const getJsonFile = (dir) => {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, files) => {
      if (err) {
        reject(err);
        return;
      }

      const jsonFile = files.find((file) => file.endsWith(".json"));

      if (!jsonFile) {
        reject("No json file found");
        return;
      }
      resolve(path.join(dir, jsonFile));
    });
  });
};

const loadModel = async () => {
  try {
    const filePath = await getJsonFile("./chatbot");
    const data = fs.readFileSync(filePath);
    const corpus = JSON.parse(data);

    corpus.data.forEach((entry) => {
      entry.utterances.forEach((utterance) => {
        nlp.addDocument("en", utterance, entry.intent);
      });
      entry.answers.forEach((answer) => {
        nlp.addAnswer("en", entry.intent, answer);
      });
    });

    console.log("Corpus data loaded successfully.");

    await nlp.train();
    nlp.save();
    console.log("Model trained successfully.");
  } catch (error) {
    console.error("Error loading corpus data:", error);
  }
};
loadModel();

const processInput = async (input, context) => {
  try {
    const result = await nlp.process("en", input, context);
    if (result.answer) {
      context.previousIntent = result.intent;
      context.previousInput = input;
      context.previousAnswer = result.answer;

      if (result.intent === 'introduce.name') {
        context.name = result.parameters.name;
      } else if (result.intent === 'introduce.age') {
        context.age = result.parameters.age;
      }
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
