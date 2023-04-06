const express = require("express");
const userRouter = express.Router();
const displayProfile = require("./profile/displayProfile");
const displayProfileImage = require("./profile/displayProfileImage");

userRouter.post("/selectTimeSlot", selectTimeSlot);
userRouter.post("/displayProfile", displayProfile);
userRouter.post("/displayProfileImage", displayProfileImage);
module.exports = userRouter;
