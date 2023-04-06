const express = require("express");
const userRouter = express.Router();

userRouter.post("/selectTimeSlot", selectTimeSlot);
