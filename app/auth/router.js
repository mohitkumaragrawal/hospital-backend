const authMiddleWare = require("../authMiddleWare");

const router = require("express").Router();

router.use("/user", require("./user/router"));
router.use("/doctor", authMiddleWare, require("./doctor/router"));
router.use("/verify", require("./verify").verifyRouter);

module.exports = router;
