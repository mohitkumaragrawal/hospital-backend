const hospitalLoginRouter = require("express").Router();
const { z } = require("zod");
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const loginSchema = z.object({
  root_mail: z.string().email(),
  root_pass: z.string(),
});
hospitalLoginRouter.post("/", async (req, res) => {
  try {
    const { root_mail, root_pass } = loginSchema.parse(req.body);
    const rows = await pool.query(
      "SELECT * FROM hospitals WHERE root_mail = ?",
      [root_mail]
    );

    if (rows.length === 0) {
      return res.status(401).json({
        status: "error",
        message: "Invalid credentials",
      });
    }

    const validPassword = await bcrypt.compare(root_pass, rows[0].root_pass);

    if (!validPassword) {
      return res.status(401).json({
        status: "error",
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign({ user: rows[0].id, type: "hospital" }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      status: "success",
      data: {
        token,
        name: rows[0].name,
        root_mail: rows[0].root_mail,
        address: rows[0].address,
        created_at: rows[0].created_at,
        coords: {
          lng: rows[0].coords.x,
          lat: rows[0].coords.y,
        },
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      error: err,
    });
  }
});

module.exports = hospitalLoginRouter;
