const hospitalLoginRouter = require("express").Router();
const { z } = require("zod");
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
hospitalLoginRouter.post("/", async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);
    //console.log(email, password);
    const rows = await pool.query(
      "SELECT * FROM hospitals WHERE root_mail = ?",
      [email]
    );
    //console.log(rows);

    if (rows.length === 0) {
      return res.status(401).json({
        status: "error",
        message: "Invalid credentials",
      });
    }

    const validPassword = await bcrypt.compare(password, rows[0].root_pass);
    //console.log(validPassword);

    if (!validPassword) {
      return res.status(401).json({
        status: "error",
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign({ user: rows[0].id, type: "hospital" }, JWT_SECRET, {
      expiresIn: "1d",
    });
    //  console.log(token);
    res.status(200).send({
      status: "success",
      data: {
        token,
        name: rows[0].name,
        root_mail: rows[0].root_mail,
        address: rows[0].address,
        created_at: rows[0].created_at,
        /*coords: {
          lng: rows[0].coords.x,
          lat: rows[0].coords.y,
        },*/
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
