const { z } = require("zod");
const pool = require("../../db");
const path = require("path");

const doctorImages = async (req, res) => {
  try {
    const { doctor_id } = req.body;
    const image_url = await pool.query(
      `select image from doctors where id=${doctor_id}`
    );
    const package_url = path.join(__dirname, "../auth/doctor/controller.js");
    const final_url = path.join(package_url, image_url);
    res.sendFile(final_url);
  } catch (err) {
    res.status(500).send({
      status: "error",
      message: err,
    });
  }
};

module.exports = doctorImages;
