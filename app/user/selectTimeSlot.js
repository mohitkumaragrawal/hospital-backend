const { z } = require("zod");
const pool = require("../db");

const selectTimeSlot = async (req, res) => {
  try {
    const { timeslot_id } = req.body;
    const patient_id = req.auth.id;
    const booked = await pool.query(
      "insert into bookings(timeslot_id,patient_id) values (?,?)",
      [timeslot_id, patient_id]
    );
    const i = await pool.query(
      `update timeslots set isBooked=true where id=${timeslot_id}`
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
