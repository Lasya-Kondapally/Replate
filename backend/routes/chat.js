const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

router.post("/", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await fetch(
      "https://api.together.xyz/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization:
            "Bearer bed3250524ec070e6aea398caef15cd6a4640b55d14e1eeab347e6ae21c65276",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "mistralai/Mistral-7B-Instruct-v0.1", // or any other supported model
          messages: [
            {
              role: "system",
              content:
                "You are a helpful assistant for a web app called Replate. In this app, donors can donate leftover food or other items, and receivers (like NGOs or individuals) can request or receive them. Answer all questions based on this system.And geolocation is used. you must also explain anything asked about it",
            },
            { role: "user", content: userMessage },
          ],
          max_tokens: 100,
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
