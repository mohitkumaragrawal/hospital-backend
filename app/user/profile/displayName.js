const pool = require("../../db");

const displayName = async (req, res) => {
  try {
    const id = req.auth.id;
    const name = await pool.query("select name,email from users where id=?", [
      id,
    ]);
    res.status(200).send(name);
  } catch (err) {
    res.status(500).send({
      status: "Error",
      message: err,
    });
  }
};

module.exports = displayName;
