const { z } = require("zod");
const pool = require("../../db");

const addTimeslotSchema = z.object({
  doctor_id: z.number(),
  day: z.string(),
  start_time: z.string(),
  end_time: z.string(),
  total_bookings: z.number(),
});

const addTimeSlot = async (req, res) => {
  try {
    const { doctor_id, day, start_time, end_time, total_bookings } =
      addTimeslotSchema.parse(req.body);

    const timeslot = await pool.query(
      "insert into timeslots(doctor_id,day_of_week,start_time,end_time,total_bookings) values (?,?,?,?,?);",
      [doctor_id, day, start_time, end_time, total_bookings]
    );
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      status: "error",
      message: "server error",
    });
  }
};

module.exports = addTimeSlot;
