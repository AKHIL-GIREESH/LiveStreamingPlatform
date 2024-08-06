const express = require("express");
const app = express();
require("dotenv").config();
const dbConnect = require("./DB/dbConnect");

app.get("/", (req, res) => res.status(200).send("Backend"));

app.listen(process.env.PORT, async () => {
  try {
    await dbConnect(process.env.MONGO);
    console.log("Server is running!");
  } catch (e) {
    console.log(e);
  }
});
