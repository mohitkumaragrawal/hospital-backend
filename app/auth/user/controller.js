const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const pool = require("../../db");

const { JWT_SECRET } = process.env;

// write a function to validate the email address
const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      status: "error",
      message: "Please enter all fields",
    });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({
      status: "error",
      message: "Please enter a valid email address",
    });
  }

  // valid email address using regex

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await pool.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?);",
      [name, email, hashedPassword]
    );

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

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: "error",
      message: "Please enter all fields",
    });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({
      status: "error",
      message: "Please enter a valid email address",
    });
  }

  try {
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
