const express = require("express");
const userRouter = express.Router();
const displayProfile = require("./profile/displayProfile");
const displayProfileImage = require("./profile/displayProfileImage");
const displayBookings = require("./displayBookings");
const displayDoctors = require("./displayDoctors");
const displaySpeciality = require("./displaySpeciality");

//userRouter.post("/selectTimeSlot", selectTimeSlot);
userRouter.post("/displayProfile", displayProfile);
userRouter.post("/displayProfileImage", displayProfileImage);
userRouter.post("/displayBookings", displayBookings);
userRouter.post("/displayDoctors", displayDoctors);
userRouter.post("/displaySpeciality", displaySpeciality);

module.exports = userRouter;
