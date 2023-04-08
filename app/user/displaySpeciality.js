const pool = require("../db");

const displaySpeciality = async (req, res) => {
  try {
    const result = await pool.query("select distinct speciality from doctors");
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({
      status: "error",
      message: err,
    });
  }
};
module.exports = displaySpeciality;
