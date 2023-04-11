const pool = require("../db");

const displayDoctorTimeslots = async (req, res) => {
  try {
    const { id, day } = req.body;
    console.log(id, " ", day);
    const timeslots = await pool.query(
      "select * from timeslots where doctor_id=? and day_of_week=?",
      [id, day]
    );
    res.status(200).send(timeslots);
  } catch (err) {
    res.status(500).send({
      status: "error",
      message: err,
    });
  }
};

module.exports = displayDoctorTimeslots;
