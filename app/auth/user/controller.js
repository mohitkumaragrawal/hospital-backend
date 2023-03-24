const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { z } = require("zod");

const pool = require("../../db");

const { JWT_SECRET } = process.env;

const registerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});
const register = async (req, res) => {
  try {
    const { name, email, password } = registerSchema.parse(req.body);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await pool.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?);",
      [name, email, hashedPassword]
    );

    sendVerificationMail(email, "user");

    res.status(200).json({
      status: "success",
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
