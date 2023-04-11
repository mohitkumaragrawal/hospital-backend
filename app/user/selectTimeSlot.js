const { z } = require("zod");
const pool = require("../db");

const selectTimeSlot = async (req, res) => {
  try {
    const { timeslot_id } = req.body;
    const patient_id = req.auth.id;
    console.log("into select time slot");

    //implemented check for duplicate entries by adding constraint in mysql
    /*const bookingExists = await pool.query(
      "select * from bookings where timeslot_id=? and patient_id=?",
      [timeslot_id, patient_id]
    );
    if (bookingExists) {
      res.status(200).send({
        status: "booking already exists",
      });
      return;
    }*/

    const insert = await pool.query(
      "insert into bookings(timeslot_id,patient_id) values (?,?)",
      [timeslot_id, patient_id]
    );
    const increment = await pool.query(
      "update timeslots set no_of_bookings=no_of_bookings+1 where id=?",
      [timeslot_id]
    );
    res.status(200).send({
      status: "success",
    });
  } catch (err) {
    res.status(200).send({
      status: "user exists",
      message: err,
    });
  }
};

module.exports = selectTimeSlot;
