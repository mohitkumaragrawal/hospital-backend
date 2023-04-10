const express = require("express");
const userRouter = express.Router();
const displayProfile = require("./profile/displayProfile");
const displayProfileImage = require("./profile/displayProfileImage");
const displayBookings = require("./displayBookings");
const displayDoctors = require("./displayDoctors");
const displaySpeciality = require("./displaySpeciality");
const displayName = require("./profile/displayName");
const displayDoctorImage = require("./displayDoctorImage");
const displayDoctorTimeslots = require("./displayDoctorTimeslots");
const selectTimeSlot = require("./selectTimeSlot");

//userRouter.post("/selectTimeSlot", selectTimeSlot);
userRouter.post("/displayName", displayName);
userRouter.post("/displayProfile", displayProfile);
userRouter.post("/displayProfileImage", displayProfileImage);
userRouter.post("/displayBookings", displayBookings);
userRouter.post("/displayDoctors", displayDoctors);
userRouter.post("/displaySpeciality", displaySpeciality);
userRouter.post("/displayDoctorImage", displayDoctorImage);
userRouter.post("/displayDoctorTimeslots", displayDoctorTimeslots);
userRouter.post("/selectTimeSlot", selectTimeSlot);

module.exports = userRouter;
