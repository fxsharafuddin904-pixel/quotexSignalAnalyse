const express = require("express");
const db = require("./db");

const router = express.Router();

// Signal Upload
router.post("/upload", async (req, res) => {
  try {
    const {
      userId,
      market,
      timeframe,
      imageUrl
    } = req.body;

    // Demo analysis (পরে AI API দিয়ে replace করতে পারবে)
    const signals = ["BUY", "SELL", "HOLD"];
    const signal =
      signals[Math.floor(Math.random() * signals.length)];

    const confidence =
      Math.floor(Math.random() * 20) + 80;

    const analysis =
      `Market analysis suggests a ${signal} signal with ${confidence}% confidence.`;

    const result = await db.query(
      `INSERT INTO signals
      (user_id, market, timeframe, image_url, signal, confidence, analysis)
      VALUES ($1,$2,$3,$4,$5,$6,$7)
      RETURNING *`,
      [
        userId,
        market,
        timeframe,
        imageUrl,
        signal,
        confidence,
        analysis
      ]
    );

    res.json({
      success: true,
      data: result.rows[0]
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
});

// Get User Signals
router.get("/history/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await db.query(
      `SELECT * FROM signals
       WHERE user_id = $1
       ORDER BY created_at DESC`,
      [userId]
    );

    res.json({
      success: true,
      signals: result.rows
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
});

module.exports = router;
