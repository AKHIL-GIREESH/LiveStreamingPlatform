const express = require("express");
const app = express();
require("dotenv").config();
const dbConnect = require("./DB/dbConnect");
const authRouter = require("./Routes/User");
const cors = require("cors")
app.use(cors())
app.use(express.json());
app.use("/api/v1/auth/", authRouter);

app.get("/", (req, res) => res.status(200).send("Backend"));

app.listen(process.env.PORT, async () => {
  try {
    await dbConnect(process.env.MONGO);
    console.log("Server is running!");
  } catch (e) {
    console.log(e);
  }
});
