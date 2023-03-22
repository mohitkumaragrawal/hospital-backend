const router = require("express").Router();

router.use("/user", require("./user/router"));
router.use("/doctor", require("./doctor/router"));
router.use("/verify", require("./verify").verifyRouter);

module.exports = router;
