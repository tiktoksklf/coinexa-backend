import express from "express";
import cors from "cors";
import multer from "multer";
import { OpenAI } from "openai";

const app = express();
app.use(cors());
const upload = multer();

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.get("/", (req, res) => {
  res.send("Coinexa VisionAI backend is running.");
});

app.post("/analyze", upload.single("chart"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No chart uploaded." });
    }

    const base64Image = req.file.buffer.toString("base64");
    const dataUrl = `data:${req.file.mimetype};base64,${base64Image}`;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a professional trading mentor. Analyze charts with trend, structure, liquidity, breaks of structure (BOS), CHoCH, entries, stop loss, take profit, and confidence scoring."
        },
        {
          role: "user",
          content: [
            { type: "text", text: "Analyze this trading chart:" },
            { 
              type: "image_url", 
              image_url: { url: dataUrl } 
            }
          ]
        }
      ]
    });

    const summary = response.choices?.[0]?.message?.content || "No response";

    res.json({ ok: true, analysis: summary });

  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: "Error analyzing chart." });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Coinexa backend running on port " + PORT);
});
