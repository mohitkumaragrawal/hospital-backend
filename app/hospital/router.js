const hospitalRouter = require("express").Router();

hospitalRouter.use("/register", require("./register"));
hospitalRouter.use("/login", require("./login"));

module.exports = hospitalRouter;
