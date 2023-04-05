const { z } = require("zod");
const pool = require("../../db");

const deleteTimeSlot = async (req, res) => {
  try {
    const timeslot_id = req.body.id;
    const del = await pool.query(
      `delete from timeslots where id=${timeslot_id}`
    );
    res.status(200).json({ status: "success" });
  } catch (err) {
    res.status(500).json({
      status: "error",
    });
  }
};

module.exports = deleteTimeSlot;
