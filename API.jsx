import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { OpenAI } from "openai";
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use(cors());
app.use(bodyParser.json());

app.post("/api/ask", async (req, res) => {
  const { car, question } = req.body;
  if (!question || !car) return res.status(400).json({ error: "Missing car or question" });

  const prompt = `Car Info: ${car.make} ${car.model} (${car.year}), ${car.mileage} mi\nUser: ${question}\nAssistant:`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You’re a helpful car ownership assistant." },
        { role: "user", content: prompt }
      ],
    });
    res.json({ answer: completion.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI error" });
  }
});

app.listen(port, () => console.log(`API listening on http://localhost:${port}`));
