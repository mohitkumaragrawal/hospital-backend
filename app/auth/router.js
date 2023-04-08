const authMiddleWareHospital = require("../authMiddleWareHospital");

const router = require("express").Router();

router.use("/user", require("./user/router"));
router.use("/doctor", authMiddleWareHospital, require("./doctor/router"));
router.use("/verify", require("./verify").verifyRouter);

module.exports = router;
