const { z } = require("zod");
const pool = require("../db");

const displayBookings = async (req, res) => {
  try {
    const id = req.auth.id;
    const result = await pool.query(
      `select * from bookings where patient_id=${id}`
    );
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({
      status: "error",
      message: err,
    });
  }
};

module.exports = displayBookings;
