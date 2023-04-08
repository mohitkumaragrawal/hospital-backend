const pool = require("../db");

const displayName = async (req, res) => {
  try {
    console.log("into displayName");
    const id = req.auth.id;
    const name = await pool.query("select name from hospitals where id=?", [
      id,
    ]);
    res.status(200).send(name);
  } catch (err) {
    res.status(500).send([{}]);
  }
};

module.exports = displayName;
