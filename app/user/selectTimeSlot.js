const { z } = require("zod");
const pool = require("../db");

const selectTimeSlot = async (req, res) => {
  try {
    const { timeslot_id } = req.body;
    const patient_id = req.auth.id;
    const increment = await pool.query(
      `update timeslots set no_of_bookings=no_of_bookings+1 where id=${timeslot_id}`
    );
    const insert = await pool.query(
      "insert into bookings(timeslot_id,patient_id) values (?,?)",
      [timeslot_id, patient_id]
    );
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err,
    });
  }
};

module.exports = selectTimeSlot;
