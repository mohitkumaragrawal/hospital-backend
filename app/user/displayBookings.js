const { z } = require("zod");
const pool = require("../db");

const displayBookings = async (req, res) => {
  try {
    //console.log("into displayBookinfs");
    const id = req.auth.id;
    //console.log(id);
    const result = await pool.query(
      "select bookings.id as id,doctor_id,doctors.name as name,hospitals.name as hospital_name,address,day_of_week,start_time,end_time from bookings,timeslots,doctors,hospitals where bookings.timeslot_id=timeslots.id and timeslots.doctor_id=doctors.id and doctors.hospital_id=hospitals.id and patient_id=?",
      [id]
    );
    console.log(result);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({
      status: "error",
      message: err,
    });
  }
};

module.exports = displayBookings;
