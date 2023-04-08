const { z } = require("zod");
const pool = require("../../db");

const displayProfile = async (req, res) => {
  try {
    const id = req.auth.id;
    const bookings = await pool.query(
      "select users.name,users.email,day_of_week,start_time,end_time,doctors.name,hospitals.name from bookings,timeslots,doctors,hospitals,users where bookings.timeslot_id=timeslots.id and timeslots.doctor_id=doctors.id and doctors.hospital_id=hospitals.id and bookings.patient_id=users.id and users.id=?",
      [id]
    );
    res.status(200).send(bookings);
  } catch (err) {
    res.status(500).send({
      status: "error",
      message: err,
    });
  }
};
module.exports = displayProfile;
