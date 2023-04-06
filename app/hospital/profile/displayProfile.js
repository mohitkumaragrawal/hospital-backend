const { z } = require("zod");
const pool = require("../../db");

const displayProfile = async (req, res) => {
  try {
    const id = req.auth.id;
    const hospital = await pool.query(
      `select id,name,address,root_mail,root_pass from hospitals where id=${id}`
    );
    res.status(200).json(hospital);
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err,
    });
  }
};
module.exports = displayProfile;
