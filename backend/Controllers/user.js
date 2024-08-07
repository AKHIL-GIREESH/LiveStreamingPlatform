const REGUSER = require("../Model/UserSchema");
const bycrpt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const regSignUp = async (req, res) => {
  try {
    const salt = await bycrpt.genSalt(10);
    const { username, email, password } = req.body;
    const Password = await bycrpt.hash(password, salt);
    const user = await REGUSER.create({ ...req.body, password: Password });
    if (user) {
      const token = jwt.sign(
        { username: user.username, id: user._id },
        process.env.secret,
        { expiresIn: "30d" }
      );
      res.status(200).json({ Status: "Success", token: token, user: user });
    }
  } catch (e) {
    res.status(500).json({ Status: "Failed", Err: e });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await REGUSER.findOne({ email: email });
    if (user) {
      const verify = bycrpt.compare(password, user.password);
      if (verify) {
        const token = jwt.sign(
          { username: user.username, id: user._id },
          process.env.secret,
          { expiresIn: "30d" }
        );
        res.status(200).json({ Status: "Success", token: token, user: user });
      } else {
        res.status(400).json({ Status: "Failed", Err: "Wrong Creds" });
      }
    } else {
      res.status(404).json({ Status: "Failed", Err: "User not found" });
    }
  } catch (e) {
    res.status(500).json({ Status: "Failed", Err: e });
  }
};

module.exports = { regSignUp, login };
