const express = require("express");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();

const app = express();

require("./app/db");

// Test request
app.get("/", (req, res) => {
  res.status(200).end();
});

// middlewares
app.use(express.json());
app.use(cors());

// routes;
app.use("/auth", require("./app/auth/router"));
app.use("/hospital", require("./app/hospital/router"));


const PORT = process.env.PORT || "3000";
console.log(`Server started listening on ${PORT}`);
app.listen(PORT);
