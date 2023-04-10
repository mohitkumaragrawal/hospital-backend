const pool = require("../db");

const displaySpeciality = async (req, res) => {
  try {
    //console.log("into display specialities");
    const result = await pool.query("select distinct speciality from doctors");
    //console.log(result);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({
      status: "error",
      message: err,
    });
  }
};
module.exports = displaySpeciality;
