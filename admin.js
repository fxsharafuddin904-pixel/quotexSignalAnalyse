const express = require("express");
const db = require("./db");

const router = express.Router();

// Pending Users
router.get("/pending-users", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT id, name, email, created_at FROM users WHERE approved = FALSE"
    );

    res.json({
      success: true,
      users: result.rows
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
});

// Approve User
router.put("/approve/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await db.query(
      "UPDATE users SET approved = TRUE WHERE id = $1",
      [id]
    );

    res.json({
      success: true,
      message: "User approved successfully"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
});

// Reject/Delete User
router.delete("/reject/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await db.query(
      "DELETE FROM users WHERE id = $1",
      [id]
    );

    res.json({
      success: true,
      message: "User rejected and deleted"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
});

// Dashboard Stats
router.get("/stats", async (req, res) => {
  try {
    const users = await db.query(
      "SELECT COUNT(*) FROM users"
    );

    const signals = await db.query(
      "SELECT COUNT(*) FROM signals"
    );

    res.json({
      success: true,
      totalUsers: users.rows[0].count,
      totalSignals: signals.rows[0].count
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
});

module.exports = router;
