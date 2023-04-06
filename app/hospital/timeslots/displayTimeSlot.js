const { z } = require("zod");
const pool = require("../../db");

const displayTimeSlot = async (req, res) => {
  try {
    const { doctor_id, day } = req.body;
    const l = await pool.query(
      `select * from timeslots where doctor_id=${doctor_id} and day_of_week=${day} order by start_time`
    );
    res.status(200).send(l);
  } catch (err) {
    res.status(500).send({
      status: "error",
    });
  }
};

module.exports = displayTimeSlot;
