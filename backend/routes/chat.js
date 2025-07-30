const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

require("dotenv").config();
router.post("/", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`, // replace this
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000", // or your frontend domain
        },
        body: JSON.stringify({
          model: "mistralai/mistral-7b-instruct", // or try 'mistralai/mixtral-8x7b-instruct'
          messages: [
            {
              role: "system",
              content:
                "You are a helpful assistant for a web app called Replate. In this app, donors can donate leftover food or other items...",
            },
            { role: "user", content: userMessage },
          ],
          max_tokens: 200,
          temperature: 0.7,
          top_p: 0.9,
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      const reply = data.choices[0].message.content;
      res.json({ reply });
    } else {
      console.error("Together.ai error:", data);
      res.status(500).json({ error: data.error || "API Error" });
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;

// 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
