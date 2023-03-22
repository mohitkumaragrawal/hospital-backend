const hospitalRegisterRouter = require("express").Router();
const bcrypt = require("bcrypt");

const emailValidator = require("../utils/email-validator");

hospitalRegisterRouter.post("/", async (req, res) => {
  const { name, address, root_mail, root_pass, coords } = req.body;
  if (!name || !address || !root_mail || !root_pass || !coords) {
    return res.status(400).json({ message: "Invalid request" });
  }

  if (!emailValidator(root_mail)) {
    return res.status(400).json({ message: "Invalid email" });
  }

  const hashedPassword = await bcrypt.hash(root_pass, 10);
  // TODO: complete it!
});

module.exports = hospitalRegisterRouter;
