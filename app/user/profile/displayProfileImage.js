const { z } = require("zod");
const pool = require("../../db");
const path = require("path");

const displayProfileImage = async (req, res) => {
  try {
    //console.log("into display profile image");
    const id = req.auth.id;
    let image_url = await pool.query("select image from users where id=?", [
      id,
    ]);
    image_url = image_url[0].image;
    //console.log(__dirname);
    const rel_url = path.join(__dirname, "../../auth/user/controller");
    //console.log(rel_url);
    const final_url = path.join(rel_url, image_url);
    //console.log(final_url);
    res.sendFile(final_url);
  } catch (err) {
    res.status(500).send({
      status: "error",
      message: err,
    });
  }
};
module.exports = displayProfileImage;
