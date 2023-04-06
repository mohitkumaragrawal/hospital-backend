const { z } = require("zod");
const pool = require("../../db");

const displayProfile = async (req, res) => {
  try {
    const id = req.auth.id;
    const user = await pool.query(
      `select id,name,email,password,created_at,verified from users where id=${id}`
    );
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err,
    });
  }
};
module.exports = displayProfile;
