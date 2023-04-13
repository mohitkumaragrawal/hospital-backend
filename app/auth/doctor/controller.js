const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { z } = require("zod");

const pool = require("../../db");
const { sendVerificationMail } = require("../verify");

const { JWT_SECRET } = process.env;

const registerSchema = z.object({
  name: z.string(),
  qualifications: z.string(),
  email: z.string().email(),
  speciality: z.string(),
});

const register = async (req, res) => {
  console.log("into register");
  try {
    const { name, qualifications, email, speciality } = registerSchema.parse(
      req.body
    );
    const hospital_id = req.auth.id;
    const file = req.file.filename;
    const image = `../uploads/${file}`;
    //const hashedPassword = await bcrypt.hash(password, 10);

    const user = await pool.query(
      "INSERT INTO doctors (name, qualifications, email, speciality,image,hospital_id) VALUES (?, ?, ?, ?, ?, ?);",
      [name, qualifications, email, speciality, image, hospital_id]
    );
    sendVerificationMail(email, "doctor");

    res.status(200).json({
      status: "success",
    });
  } catch (err) {
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

    const user = await pool.query("SELECT * FROM doctors WHERE email = ?", [
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

    let src = path.join(__dirname, user[0].image);
    const token = jwt.sign({ user: user[0].id, type: "doctor" }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      status: "success",
      data: {
        token,
        name: user[0].name,
        email: user[0].email,
        speciality: user[0].speciality,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      error: err,
    });
  }
};

module.exports = { register, login };
