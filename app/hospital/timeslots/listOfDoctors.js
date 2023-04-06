const { z } = require("zod");
const pool = require("../../db");

const listOfDoctors = async (req, res) => {
  try {
    const { name } = req.body;
    const hospital_id = req.auth.id;
    const search_term = `%${name}%`;
    const doctor_list = await pool.query(
      `select name, email, qualifications, speciality, image from doctors where hospital_id=${hospital_id} and name like ${search_term}`
    );
    res.status(200).send(doctor_list);
  } catch (err) {
    res.status(500).send({
      status: "error",
      message: err,
    });
  }
};

module.exports = listOfDoctors;