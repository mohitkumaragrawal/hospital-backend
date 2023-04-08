const { z } = require("zod");
const pool = require("../../db");

const testSchema = z.object({
  name: z.string(),
  description: z.string(),
});

const addTest = async (req, res) => {
  try {
    const id = req.auth.id;
    const { name, description } = testSchema.parse(req.body);
    const file = req.file.filename;
    const image = `../uploads/${file}`;
    const test = await pool.query(
      `insert into tests(name,description,hospital,image) values (?,?,?,?)`,
      [name, description, id, image]
    );
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

module.exports = addTest;
