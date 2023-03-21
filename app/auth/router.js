const router = require("express").Router();

router.use("/user", require("./user/router"));
router.use("/doctor", require("./doctor/router"));

module.exports = router;
