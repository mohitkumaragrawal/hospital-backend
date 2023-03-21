import express from "express";

const app = express();

// Test request
app.get("/", (req, res) => {
  res.status(200).end();
});

const PORT = "3000" || process.env.PORT;

console.log(`Server started listening on ${PORT}`);
app.listen(PORT);
