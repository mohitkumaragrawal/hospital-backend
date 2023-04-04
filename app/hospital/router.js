const hospitalRouter = require("express").Router();

const multer = require("multer");

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

module.exports = hospitalRouter;
