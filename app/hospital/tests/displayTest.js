const { z } = require("zod");
const pool = require("../../db");

const displayTest = async (req, res) => {
  try {
    const id = req.auth.id;
    const tests = await pool.query(`select * from tests where hospital=${id}`);
    res.status(200).send(tests);
  } catch (err) {
    res.status(500).send({
      status: "error",
      message: err,
    });
  }
};

module.exports = displayTest;
