const pool = require("../db");
const path = require("path");

const displayDoctorImage = async (req, res) => {
  try {
    const { id } = req.body;
    let image_url = await pool.query("select image from doctors where id=?", [
      id,
    ]);
    image_url = image_url[0].image;
    const rel_url = path.join(__dirname, "../auth/doctor/controller.js");
    const final_url = path.join(rel_url, image_url);
    //console.log(final_url);
    res.status(200).sendFile(final_url);
  } catch (err) {
    res.status(500).send({
      status: "error",
      message: err,
    });
  }
};

module.exports = displayDoctorImage;
