const pool = require("../db");

//name, qualification, specilaization, distance, hospital_name , address
//image

const displayDoctors = async (req, res) => {
  try {
    //console.log("into display doctors");
    const { speciality } = req.body;
    const doctors = await pool.query(
      "select doctors.id as doctor_id,doctors.name as doctor_name,doctors.email as doctor_email,qualifications,speciality,doctors.hospital_id as hospital_id,hospitals.name as hospital_name,address from doctors,hospitals where doctors.hospital_id=hospitals.id and speciality=?",
      [speciality]
    );
    //console.log(doctors);
    res.status(200).send(doctors);
  } catch (err) {
    res.status(500).send({
      status: "error",
      message: err,
    });
  }
};

module.exports = displayDoctors;
