const jwt = require("jsonwebtoken");
const { z } = require("zod");

const transporter = require("../utils/mail-transporter");

const pool = require("../db");

function generateVerificationToken(email, type) {
  return jwt.sign({ email, type }, process.env.JWT_SECRET, {
    expiresIn: "5h",
  });
}

function sendVerificationMail(email, type) {
  const token = generateVerificationToken(email, type);
  const url = `${process.env.CLIENT_URL}/auth/verify/${token}`;
  const mailOptions = {
    from: process.env.EMAIL_ID,
    to: email,
    subject: "Verify your email",
    html: `<p>Click on the link below to verify your email</p>
    <a href="${url}">${url}</a>`,
  };
  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log("Error sending email", err);
    } else {
      console.log(`[Verficication mail sent] for ${email} and ${type}`);
    }
  });
}

const verifyRouter = require("express").Router();

// GET /auth/verify/:token: verify email
verifyRouter.get("/:token", async (req, res) => {
  const { token } = req.params;

  try {
    const { email, type } = jwt.verify(token, process.env.JWT_SECRET);
    if (type === "user") {
      await pool.query("UPDATE users SET verified = 1 WHERE email = ?", [
        email,
      ]);
    } else if (type === "doctor") {
      await pool.query("UPDATE doctors SET verified = 1 WHERE email = ?", [
        email,
      ]);
    }
    res.status(200).json({
      status: "success",
      message: "Email verified successfully",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      status: "error",
      message: "Server error",
    });
  }
});

const verificationSchema = z.object({
  email: z.string().email(),
  type: z.string().nonempty(),
});

// POST /auth/verify: send verification email
verifyRouter.post("/", async (req, res) => {
  try {
    const { email, type } = verificationSchema.parse(req.body);
    if (type === "user") {
      const user = await pool.query("SELECT * FROM users WHERE email = ?", [
        email,
      ]);
      if (user.length === 0) {
        return res.status(404).json({
          status: "error",
          message: "User not found",
        });
      }
    } else if (type === "doctor") {
      const doctor = await pool.query("SELECT * FROM doctors WHERE email = ?", [
        email,
      ]);
      if (doctor.length === 0) {
        return res.status(404).json({
          status: "error",
          message: "Doctor not found",
        });
      }
    } else {
      return res.status(400).json({
        status: "error",
        message: "Invalid type",
      });
    }
    sendVerificationMail(email, type);
    res.status(200).json({
      status: "success",
      message: "Verification mail sent",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      status: "error",
      error: err,
    });
  }
});

module.exports = {
  sendVerificationMail,
  verifyRouter,
};
