const hospitalRouter = require("express").Router();

hospitalRouter.use("/register", require("./register"));
hospitalRouter.use("/login", require("./login"));
hospitalRouter.use("/closest", require("./closest"));

module.exports = hospitalRouter;
