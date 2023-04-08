const pool = require("../db");

const displayDoctors = async (req, res) => {
  try {
    const { speciality } = req.body;
    const doctors = await pool.query(
      `select * from doctors where speciality=${speciality}`
    );
    res.status(200).send(doctors);
  } catch (err) {
    res.status(500).send({
      status: "error",
      message: err,
    });
  }
};

module.exports = displayDoctors;
