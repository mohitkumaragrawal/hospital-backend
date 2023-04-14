const express = require("express");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();

const app = express();

require("./app/db");
const authMiddleWareHospital = require("./app/authMiddleWareHospital");
const hospitalRouter = require("./app/hospital/router");
const userRouter = require("./app/user/router");
const authMiddleWareUser = require("./app/authMiddleWareUser");

// Test request
app.get("/api", (req, res) => {
  res.status(200).end();
});

// middlewares
app.use(express.json());
app.use(cors());

// routes;
app.use("/api/auth", require("./app/auth/router"));
app.use("/api/hospital", require("./app/hospital/router"));

app.use("/api/mainpage/hospital", authMiddleWareHospital, hospitalRouter);
app.use("/api/mainpage/user", authMiddleWareUser, userRouter);

const PORT = process.env.PORT || "5000";
console.log(`Server started listening on ${PORT}`);
app.listen(PORT);
