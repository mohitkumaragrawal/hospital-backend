const { z } = require("zod");
const pool = require("../../db");

const listOfDoctors = async (req, res) => {
  //console.log("into search doctors");
  try {
    const { name } = req.body;
    const hospital_id = req.auth.id;
    const search_term = `%${name}%`;
    const doctor_list = await pool.query(
      `select id,name, email, qualifications, speciality from doctors where hospital_id=? and name like ?`,
      [hospital_id, search_term]
    );
    //console.log(doctor_list);
    res.status(200).send(doctor_list);
  } catch (err) {
    res.status(500).send({
      status: "error",
      message: err,
    });
  }
};

module.exports = listOfDoctors;
