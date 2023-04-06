const { z } = require("zod");
const pool = require("../../db");
const path = require("path");

const displayProfileImage = async (req, res) => {
  try {
    const id = req.auth.id;
    const image_url = await pool.query(
      `select image from hospitals where id=${id}`
    );
    const rel_url = path.join(__dirname, "./register.js");
    const final_url = path.join(rel_url, image_url);
    res.sendFile(final_url);
  } catch (err) {
    res.status(500).send({
      status: "error",
      message: err,
    });
  }
};
module.exports = displayProfileImage;
