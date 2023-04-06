const hospitalRouter = require("express").Router();
const { registerDoctor, loginDoctor } = require("../auth/doctor/controller");
const doctorRouter = require("../auth/doctor/router");
const addTimeSlot = require("../hospital/timeslots/addTimeslot");
const deleteTimeSlot = require("../hospital/timeslots/deleteTimeSlot");
const searchDoctor = require("../hospital/timeslots/listOfDoctors");
const displayTimeSlot = require("../hospital/timeslots/displayTimeSlot");
const displayProfile = require("./profile/displayProfile");
const displayProfileImage = require("./profile/displayProfileImage");
const doctorImages = require("./timeslots/doctorImages");

const multer = require("multer");
const authMiddleWare = require("../authMiddleWare");

const imgConfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./app/auth/doctor/uploads");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const isImage = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) callback(null, true);
  else callback(null, Error("only image file is allowed"));
};

const upload = multer({
  storage: imgConfig,
  fileFilter: isImage,
});

hospitalRouter.use("/register", upload.single("image"), require("./register"));
hospitalRouter.use("/login", require("./login"));
hospitalRouter.use("/closest", require("./closest"));

hospitalRouter.use("/addDoctor", doctorRouter);
hospitalRouter.post("/searchDoctor", searchDoctor);
hospitalRouter.post("/addTimeSlot", addTimeSlot);
hospitalRouter.post("/displayTimeSlot", displayTimeSlot);
hospitalRouter.post("/deleteTimeSlot", deleteTimeSlot);
hospitalRouter.post("/displayProfile", displayProfile);
hospitalRouter.post("/displayProfileImage", displayProfileImage);
hospitalRouter.post("/doctorImages", doctorImages);

module.exports = hospitalRouter;
