import express from "express";

const app = express();
app.use(express.json());

app.post("/send", async (req, res) => {
  try {
    const botToken = process.env.BOT_TOKEN; // التوكن هنا
    if (!botToken) {
      return res.status(500).json({ ok: false, error: "BOT_TOKEN not set" });
    }

    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const body = req.body;

    const tgResponse = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await tgResponse.json();
    res.status(tgResponse.ok ? 200 : 500).json(data);
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.get("/", (req, res) => res.send("✅ Render Telegram Proxy Running"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Listening on ${PORT}`));
