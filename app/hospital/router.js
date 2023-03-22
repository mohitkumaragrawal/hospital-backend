const hospitalRouter = require("express").Router();

hospitalRouter.use("/register", require("./register"));

module.exports = hospitalRouter;
