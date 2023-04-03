const hospitalClosestRouter = require("express").Router();
const { z } = require("zod");

const pool = require("../db");

const hospitalClosestSchema = z.object({
  lat: z.number(),
  lng: z.number(),
});
hospitalClosestRouter.post("/", async (req, res) => {
  try {
    const { lat, lng } = hospitalClosestSchema.parse(req.body);

    const rows = await pool.query(
      `
      SELECT *, ST_Distance_Sphere(ST_GeometryFromText('POINT(? ?)', 4326), coords) AS distance 
      FROM hospitals 
      ORDER BY distance 
      LIMIT 10;
      `,
      [lat, lng]
    );

    res.status(200).json({
      status: "success",
      data: rows,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
});

module.exports = hospitalClosestRouter;
