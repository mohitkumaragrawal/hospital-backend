const hospitalRegisterRouter = require("express").Router();
const bcrypt = require("bcrypt");
const { z } = require("zod");

const pool = require("../db");

const hospitalRegisterSchema = z.object({
  name: z.string(),
  address: z.string(),
  root_mail: z.string().email(),
  root_pass: z.string(),
  coords: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
});

hospitalRegisterRouter.post("/", async (req, res) => {
  try {
    const data = hospitalRegisterSchema.parse(req.body);

    const file = req.file.filename;
    const image = `../uploads/${file}`;
    const hashedPassword = await bcrypt.hash(data.root_pass, 10);

    const sqlPoint = `ST_GeomFromText('POINT(${data.coords.lng} ${data.coords.lat})', 4326)`;

    const hospital = await pool.query(
      `INSERT INTO hospitals 
      (name, address, root_mail, root_pass, coords, image) 
      VALUES (?, ?, ?, ?, ${sqlPoint},?);`,

      [data.name, data.address, data.root_mail, hashedPassword, image]
    );

    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      error,
    });
  }
});

module.exports = hospitalRegisterRouter;
