const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { z } = require("zod");
const fs = require("fs");
const path = require("path");

const pool = require("../../db");
const { sendVerificationMail } = require("../verify");

const { JWT_SECRET } = process.env;

const registerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

const register = async (req, res) => {
  try {
    const { name, email, password } = registerSchema.parse(req.body);
    const file = req.file.filename;
    const image = `../uploads/${file}`;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await pool.query(
      "INSERT INTO users (name, email, password,image) VALUES (?, ?, ?, ?);",
      [name, email, hashedPassword, image]
    );

    sendVerificationMail(email, "user");

    res.status(200).json({
      status: "success",
      //image:Buffer.from(image,'binary').toString('base64')
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      status: "error",
      message: "Server error",
    });
  }
};

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
const login = async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);
    const user = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    console.log(user);

    //console.log(user);

    if (user.length === 0) {
      return res.status(401).json({
        status: "error",
        message: "Invalid credentials",
      });
    }
    const validPassword = await bcrypt.compare(password, user[0].password);
    if (!validPassword) {
      return res.status(401).json({
        status: "error",
        message: "Invalid credentials",
      });
    }

    let src = path.join(__dirname, user[0].image);
    const token = jwt.sign({ user: user[0].id, type: "user" }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      status: "success",
      data: {
        token,
        name: user[0].name,
        email: user[0].email,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      status: "error",
      message: "Server error",
    });
  }
};

module.exports = { register, login };
