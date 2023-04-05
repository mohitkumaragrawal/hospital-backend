const router = require("express").Router();
const { register, login } = require("./controller");

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

//router.post("/register",upload.single('image'), register);
router.post("/register", register);
router.post("/login", login);

module.exports = router;
