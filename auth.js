const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("./db");

const router = express.Router();

// Signup
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userCheck = await db.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (userCheck.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Email already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      `INSERT INTO users
      (name, email, password)
      VALUES ($1,$2,$3)`,
      [name, email, hashedPassword]
    );

    res.json({
      success: true,
      message: "Signup request submitted. Wait for admin approval."
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await db.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "User not found"
      });
    }

    const user = result.rows[0];

    if (!user.approved) {
      return res.status(403).json({
        success: false,
        message: "Account not approved by admin"
      });
    }

    const match = await bcrypt.compare(
      password,
      user.password
    );

    if (!match) {
      return res.status(400).json({
        success: false,
        message: "Wrong password"
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
});

module.exports = router;
