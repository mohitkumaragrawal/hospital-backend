const { z } = require("zod");
const pool = require("../../db");

const deleteTest = async (req, res) => {
  try {
    const { id } = req.body;
    const d = await pool.query(`delete from tests where id=${id}`);
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err,
    });
  }
};

module.exports = deleteTest;
